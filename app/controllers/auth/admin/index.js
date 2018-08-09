import Controller from '@ember/controller';
import ModalContainerMixin from '../../../mixins/modal-container';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Controller.extend(ModalContainerMixin, {
  api: service(),
  notifications: service(),

  inviteUser: task(function*() {
    let { givenName, familyName, email, type } = this.modalContext;
    try {
      yield this.api.inviteUser.perform({ givenName, familyName, email, type });
    } catch (e) {
      this.notifications.error(e);
      return;
    }

    this.closeModal();
    this.notifications.success('Invitation sent');
  })
})
