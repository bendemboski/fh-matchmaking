import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  currentUser: service(),
  router: service(),

  redirect() {
    if (this.currentUser.isAdmin) {
      this.router.transitionTo('auth.admin.index');
    } else if (this.currentUser.isCaseworker) {
      this.router.transitionTo('auth.caseworker.index');
    } else {
      this.router.transitionTo('auth.host.index');
    }
  }
});
