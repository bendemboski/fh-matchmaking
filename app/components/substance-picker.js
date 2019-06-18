import Component from '@ember/component';
import { getSubstances } from '../utils/profile';
import EmberObject from '@ember/object';

export default Component.extend({
  classNames: [ 'substance-picker' ],

  // array of selected substances
  substances: null,

  init() {
    this._super(...arguments);

    this.set('substances', this.substances || []);

    this.set('options', getSubstances().map(({ value, label }) => {
      return EmberObject.create({
        value,
        label,
        selected: this.substances.includes(value)
      });
    }));
  },

  toggleOption(option) {
    option.toggleProperty('selected');
    this.notifyOnChange();
  },

  setNone() {
    for (let option of this.options) {
      option.set('selected', false);
    }
    this.notifyOnChange();
  },

  notifyOnChange() {
    this.onchange(this.options.filterBy('selected').mapBy('value'));
  }
});
