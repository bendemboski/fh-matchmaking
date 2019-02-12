import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { readOnly } from '@ember/object/computed';

export default Controller.extend({
  router: service(),

  residents: readOnly('model'),

  actions: {
    viewProfile(column) {
      this.router.transitionTo('auth.admin.caseworker.resident', column.content.caseworker, column.content);
    }
  }
});
