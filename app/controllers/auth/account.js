import Controller from '@ember/controller';
import ModalContainerMixin from '../../mixins/modal-container';
import { inject as service } from '@ember/service';
import Changeset from 'ember-changeset';
import { task } from 'ember-concurrency';
import getAwsErrorCode from '../../utils/get-aws-error-code';

const userAttributes = [
  'givenName',
  'familyName',
  'phoneNumber',
  'birthdate',
  'email'
];

export default Controller.extend(ModalContainerMixin, {
  currentUser: service(),
  notifications: service(),

  setup() {
    this._super(...arguments);

    let props = this.currentUser.getProperties(...userAttributes);
    // Phone number needs a +1 in cognito, but we don't want to show that to the
    // user
    if (props.phoneNumber && props.phoneNumber.slice(0, 2) === '+1') {
      props.phoneNumber = props.phoneNumber.slice(2);
    }

    this.set('changeset', new Changeset(this.currentUser.getProperties(...userAttributes)));
    this.setProperties({
      password1: '',
      password2: ''
    })
  },

  submit: task(function*() {
    let { oldPassword, password1, password2 } = this;

    if (password1) {
      if (!oldPassword) {
        this.notifications.error('You need to enter your current password');
        return;
      }

      if (password1 !== password2) {
        this.notifications.error("Passwords don't match");
        return;
      }

      try {
        yield this.currentUser.changePassword.perform(oldPassword, password1);
        this.notifications.success('Your password has been changed');
      } catch (e) {
        let error;

        let code = getAwsErrorCode(e);
        if (code === 'NotAuthorizedException') {
          error = 'The current password you entered is incorrect';
        } else {
          error = e;
        }
        this.notifications.error(error, { preamble: 'Unable to change your password' });
      }
    }

    if (this.changeset.isDirty) {
      let changes = {};
      this.changeset.changes.forEach(({ key, value }) => changes[key] = value);
      if (changes.phoneNumber) {
        changes.phoneNumber = `+1${changes.phoneNumber}`;
      }

      try {
        yield this.currentUser.updateAttributes.perform(changes);
        this.changeset.save();
        this.notifications.success('Your account info has been updated');
      } catch (e) {
        this.notifications.error(e, { preamble: 'Unable to update your account info' });
      }
    }
  })
});
