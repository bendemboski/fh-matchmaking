import Component from '@ember/component';

export default Component.extend({
  classNames: [ 'number-incrementer' ],

  value: 0,
  minValue: 0,
  onChange: null,

  actions: {
    increment() {
      this.get('onChange')(this.get('value') + 1);
    },
    decrement() {
      this.get('onChange')(this.get('value') - 1);
    }
  }
});
