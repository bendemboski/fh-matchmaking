import Ember from 'ember';

export default Ember.Route.extend({});


Ember.$(window, document, undefined).ready(function () {

    Ember.$('input').blur(function () {
        var $this = Ember.$(this);
        if ($this.val())
            $this.addClass('typed');
        else
            $this.removeClass('typed');
    });
});
