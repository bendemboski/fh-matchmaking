import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: [ 'number-incrementer' ],

  value: computed({
    get() {
      return 0;
    },
    set(key, value) {
      // if it's undefined or null, make it 0
      value = value || 0;
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
