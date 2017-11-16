import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  didInsertElement() {
    this._super(...arguments);

    // let $ = this.$.bind(this);
  }
});

// NumberIncrementer

$(document).on('click','.value-control',function(){
    var action = $(this).attr('data-action')
    var target = $(this).attr('data-target')
    var value  = parseFloat($('[id="'+target+'"]').val());
    if ( action == "plus" ) {
      value++;
    }
    if ( action == "minus" && value > 0 ) {
      value--;
    }
    $('[id="'+target+'"]').val(value)
})
