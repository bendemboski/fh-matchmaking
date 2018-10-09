import Component from '@ember/component';

export default Component.extend({
  tagName: 'form',
  classNames: [ 'profile-form' ],

  submit(e) {
    e.preventDefault();
    this.onsubmit(e);
  }
});
