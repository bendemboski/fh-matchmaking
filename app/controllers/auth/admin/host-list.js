import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { readOnly } from '@ember/object/computed';

export default Controller.extend({
  router: service(),

  hosts: readOnly('model'),

  actions: {
    viewProfile(column) {
      this.router.transitionTo('auth.admin.host', column.content);
    }
  }
});
