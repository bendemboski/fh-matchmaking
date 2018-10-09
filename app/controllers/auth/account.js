import Controller from '@ember/controller';
import ModalContainerMixin from '../../mixins/modal-container';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';
import getAwsErrorCode from '../../utils/get-aws-error-code';

export default Controller.extend(ModalContainerMixin, {
  currentUser: service(),
  notifications: service(),

  setup() {
    this._super(...arguments);

    this.setProperties({
      password1: '',
      password2: ''
    })
  },

  submit: task(function*(changeset) {
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

    if (changeset.isDirty) {
      try {
        yield changeset.save();
        this.notifications.success('Your account info has been updated');
      } catch (e) {
        this.notifications.error(e, { preamble: 'Unable to update your account info' });
      }
    }
  })
});
