import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  currentUser: service(),
  router: service(),

  beforeModel() {
    if (!this.currentUser.isCaseworker) {
      this.router.transitionTo('auth.index');
    }
  },

  model() {
    // TODO: fetch resident list
  }
});
