import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  currentUser: service(),

  setup() {
    this._super(...arguments);
    document.body.classList.add(`user-type-${this.currentUser.type}`);
  },

  reset() {
    document.body.classList.remove(`user-type-${this.currentUser.type}`);    
    this._super(...arguments);
  }
});
