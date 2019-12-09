import Component from '@ember/component';
import ModalContainerMixin from '../../mixins/modal-container';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend(ModalContainerMixin, {
  store: service(),
  notifications: service(),

  init() {
    this._super(...arguments);
    this.isProd = window.location.host.startsWith('matchmaking.');
  },

  inviteUser: task(function*() {
    let { type, email, givenName, familyName } = this.modalContext;
    let user = this.store.createRecord(type, {
      email,
      givenName,
      familyName
    });
    try {
      yield user.save();
    } catch (e) {
      this.notifications.error(e);
      return;
    }

    this.closeModal();
    this.notifications.success('Invitation sent');
  })
})
