import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Route.extend({
  currentUser: service(),
  router: service(),
  store: service(),

  beforeModel() {
    if (!this.currentUser.isHost) {
      this.router.transitionTo('auth.index');
    }
  },

  model() {
    return this.modelTask.perform();
  },

  modelTask: task(function*() {
    let host = this.currentUser.model;
    let profile = yield host.profile;
    return profile || this.store.createRecord('host-profile', { host });
  })
});
