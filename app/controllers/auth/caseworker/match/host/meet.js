import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  router: service(),

  actions: {
    submit(e) {
      e.preventDefault();
      this.router.transitionTo('auth.caseworker.match.thankyou');
    }
  }
});
