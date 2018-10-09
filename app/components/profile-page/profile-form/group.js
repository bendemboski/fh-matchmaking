import Component from '@ember/component';
import uniqueId from '../../../utils/unique-id';

export default Component.extend({
  classNames: [ 'form-group' ],

  init() {
    this._super(...arguments);
    this.set('inputId', uniqueId());
  }
});
