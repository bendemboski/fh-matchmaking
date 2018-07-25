import $ from 'jquery';
import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { run } from '@ember/runloop';

export default Component.extend({
  tagName: 'nav',
  classNames: [ 'navbar', 'navbar-expand-lg', 'fixed-top'],
  classNameBindings: [ 'shrink:navbar-shrink','currentUser.isHost:navbar-host', 'currentUser.isGuest:navbar-cwk', 'currentUser.isAdmin:navbar-admin' ],

  shrink: false,

  currentUser: service(),

  didInsertElement() {
    this._super(...arguments);

    // Shrink navbar when we've scrolled down the page
    this.windowScrollListener = () => run.once(this, this.checkShrink);
    $(window).on('scroll', this.windowScrollListener);
    this.checkShrink();

    // Set up scrollspy
    $('body').scrollspy({
      target: `#${this.id}`,
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
