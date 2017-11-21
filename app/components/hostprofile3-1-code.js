import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  didInsertElement() {
    this._super(...arguments);

    // let $ = this.$.bind(this);
  }
});

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}
