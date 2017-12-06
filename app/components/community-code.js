import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  didInsertElement() {
    this._super(...arguments);

    // let $ = this.$.bind(this);
  }

});
