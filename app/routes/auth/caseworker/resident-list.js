import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  store: service(),

  model() {
    // Our user is already loaded by the auth.caseworker route, and our
    // residents are included in the payload, and we can only see our own
    // residents, so we can just peek them
    return this.store.peekAll('resident-profile');
  }
});
