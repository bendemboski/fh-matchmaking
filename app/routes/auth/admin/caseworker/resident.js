import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  store: service(),

  model({ resident_profile_id: profileId }) {
    return this.store.peekRecord('resident-profile', profileId);
  }
});
