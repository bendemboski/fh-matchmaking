import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { readOnly } from '@ember/object/computed';
import { equal } from 'ember-awesome-macros';
import raw from 'ember-macro-helpers/raw';
import { task } from 'ember-concurrency';
import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';
import { Promise } from 'rsvp';

export default Service.extend({
  session: service(),
  cognito: service(),
  store: service(),
  cognitoUser: readOnly('cognito.user'),

  model: null, // user model (admin, host or caseworker)
  type: null, // user type

  isHost: equal('type', raw('host')),
  isCaseworker: equal('type', raw('caseworker')),
  isAdmin: equal('type', raw('admin')),

  //
  // Load the current user's attributes and set them on this service
  //
  load: task(function*() {
    if (this.session.isAuthenticated) {
      let groups = yield this.cognitoUser.getGroups();
      let type;
      if (groups.includes('admins')) {
        type = 'admin';
      } else if (groups.includes('caseworkers')) {
        type = 'caseworker';
      } else {
        type = 'host';
      }

      let { cognitoUser: { user: { username } } } = this;
      let model = yield this.store.findRecord(type, username);

      this.setProperties({ model, type });
    }
  }),

  //
  // Change the current user's password
  //
  changePassword: task(function*(oldPassword, newPassword) {
    yield this.cognitoUser.changePassword(oldPassword, newPassword);
  }),

  //
  // Start the forgot password flow. Return value is the user object that needs
  // to be passed to completeForgotPassword
  //
  forgotPassword: task(function*(email) {
    let user = new CognitoUser({
      Username: email,
      Pool: new CognitoUserPool({
        UserPoolId: this.cognito.poolId,
        ClientId: this.cognito.clientId
      })
    });

    return yield new Promise((resolve, reject) => {
      user.forgotPassword({
        onFailure(err) {
          reject(err);
        },
        inputVerificationCode() {
          resolve(user);
        }
      })
    });
  }),

  //
  // Complete the forgot password flow -- user is the return value from the
  // forgotPassword task, and verificationCode and newPassword are values
  // collected from the user
  //
  completeForgotPassword: task(function*(user, verificationCode, newPassword) {
    return yield new Promise((resolve, reject) => {
      user.confirmPassword(verificationCode, newPassword, {
        onSuccess: resolve,
        onFailure: reject
      });
    })
  })
});
