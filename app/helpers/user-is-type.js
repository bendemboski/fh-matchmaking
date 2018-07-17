import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

export default Helper.extend({
  currentUser: service(),

  compute([ type ]) {
    return this.get('currentUser.type') === type;
  }
});
