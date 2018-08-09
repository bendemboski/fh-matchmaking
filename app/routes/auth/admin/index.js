import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  api: service(),

  model() {
    return this.api.getUserStats.perform();
  }
});
