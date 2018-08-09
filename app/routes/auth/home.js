import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  currentUser: service(),

  redirect() {
    if (this.currentUser.isAdmin) {
      this.transitionTo('auth.admin.index');
    }
  }
});
