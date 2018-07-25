import Component from '@ember/component';

export default Component.extend({
  classNames: [ 'number-incrementer' ],

  value: 0,
  minValue: 0,
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
