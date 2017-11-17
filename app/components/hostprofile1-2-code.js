import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  adultCount: 1,
  kidCount: 0,
  petCount: 0,

  didInsertElement() {
    this._super(...arguments);

    // let $ = this.$.bind(this);
  },

  actions: {
    increment(propName) {
      this.incrementProperty(propName);
    },

    decrement(propName) {
      this.decrementProperty(propName);
    }
  }
});
