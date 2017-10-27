import Ember from 'ember';

export default Ember.Route.extend({});

$(window, document, undefined).ready(function () {

    $('input').blur(function () {
        var $this = $(this);
        if ($this.val())
            $this.addClass('typed');
        else
            $this.removeClass('typed');
    });
});
