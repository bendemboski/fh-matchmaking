import Ember from 'ember';

const {
  $,
  Component,
  inject: { service },
  run
} = Ember;

export default Component.extend({
  tagName: 'nav',
  classNames: [ 'navbar', 'navbar-expand-lg', 'fixed-top'],
  classNameBindings: [ 'shrink:navbar-shrink','userService.isHost:navbar-host', 'userService.isCaseWorker:navbar-cwk', 'userService.isAdmin:navbar-admin' ],

  shrink: false,

  //Define a property -service injection
  userService: service('user'),

  didInsertElement() {
    this._super(...arguments);

    // Shrink navbar when we've scrolled down the page
    this.windowScrollListener = () => run.once(this, this.checkShrink);
    $(window).on('scroll', this.windowScrollListener);
    this.checkShrink();

    // Set up scrollspy
    $('body').scrollspy({
      target: `#${this.get('id')}`,
      offset: 54
    });
  },

  willDestroyElement() {
    $('body').scrollspy('dispose');
    $(window).off('scroll', this.windowScrollListener);
    this._super(...arguments);
  },

  // If we're scrolled more than 100px down, we want to shrink, otherwise don't
  // shrink.
  checkShrink() {
    this.set('shrink', window.pageYOffset > 100);
  }
});
