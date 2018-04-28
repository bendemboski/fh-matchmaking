import Component from '@ember/component';

export default Component.extend({
  didInsertElement() {
    this._super(...arguments);

    let $ = this.$.bind(this);

    $('input').blur(function () {
        var $this = $(this);
        if ($this.val())
            $this.addClass('typed');
        else
            $this.removeClass('typed');
    });
  }
});
