import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: [ 'number-incrementer' ],

  minValue: computed({
    get() {
      return 0;
    },
    set(key, minValue) {
      if (this.value < minValue) {
        this.set('value', minValue);
      }
      return minValue;
    }
  }),

  value: computed({
    get() {
      return this.minValue;
    },
    set(key, value) {
      // if it's undefined or null, make it minValue
      value = value || this.minValue;
      return value;
    }
  }),

  onChange: null,

  actions: {
    increment() {
      this.onChange(this.value + 1);
    },
    decrement() {
      this.onChange(this.value - 1);
    }
  }
});
