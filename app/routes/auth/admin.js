import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  currentUser: service(),
  router: service(),

  beforeModel() {
    if (!this.currentUser.isAdmin) {
      this.router.transitionTo('auth.index');
    }
  }
});
