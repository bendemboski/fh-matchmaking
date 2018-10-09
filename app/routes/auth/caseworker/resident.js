import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  store: service(),

  // The resident profiles are included when getting the caseworker, so they are
  // already all loaded
  model({ resident_profile_id: id }) {
    return this.store.peekRecord('resident-profile', id);
  }
});
