import Controller from '@ember/controller';
import ModalContainerMixin from '../mixins/modal-container';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Controller.extend(ModalContainerMixin, {
  session: service(),
  currentUser: service(),
  notifications: service(),

  //
  // Authenticate the user with email/password
  //
  login: task(function*() {
    let { email, password } = this;
    try {
      yield this.session.authenticate('authenticator:cognito', { username: email, password });
    } catch (e) {
      let { state, message } = e;
      if (state && state.name === 'newPasswordRequired') {
        state.userAttributes = {};
        this.openModal('changePassword', { state });
      } else {
        this.notifications.error(message);
      }
    }
  }),

  //
  // Change user's password from the initial temporary password to the one they
  // specify (happens on first login)
  //
  changePassword: task(function*() {
    let { newPassword1, newPassword2 } = this.modalContext;
    if (newPassword1 !== newPassword2) {
      this.notifications.error("Passwords don't match");
      return;
    }

    try {
      yield this.session.authenticate('authenticator:cognito', {
        password: newPassword1,
        state: this.modalContext.state
      });
    } catch (e) {
      this.notifications.error(e);
    }
  }),

  //
  // Start the forgot password flow
  //
  forgotPassword: task(function*() {
    let { email } = this.modalContext;
    try {
      let user = yield this.currentUser.forgotPassword.perform(email);
      this.openModal('completeForgotPassword', { user, email });
    } catch (e) {
      this.notifications.error(e);
    }
  }),

  //
  // Complete the forgot password flow with user input
  //
  completeForgotPassword: task(function*() {
    let { user, email, code, password } = this.modalContext;
    try {
      yield this.currentUser.completeForgotPassword.perform(user, code, password);
    } catch (e) {
      this.notifications.error(e);
      return;
    }

    this.closeModal();

    this.notification.success('Password changed!');

    try {
      yield this.session.authenticate('authenticator:cognito', { username: email, password });
    } catch (e) {
      this.notifications.error(e);
    }
  })
})
