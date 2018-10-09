import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { run } from '@ember/runloop';

export default Component.extend({
  tagName: 'nav',
  classNames: [ 'navbar', 'navbar-expand-lg', 'fixed-top'],
  classNameBindings: [ 'shrink:navbar-shrink' ],

  currentUser: service(),
  session: service(),

  shrink: false,

  didInsertElement() {
    this._super(...arguments);

    // Shrink navbar when we've scrolled down the page
    this.windowScrollListener = () => run.once(this, this.checkShrink);
    window.addEventListener('scroll', this.windowScrollListener);
    this.checkShrink();
  },

  willDestroyElement() {
    window.removeEventListener('scroll', this.windowScrollListener);
    this._super(...arguments);
  },

  // If we're scrolled more than 100px down, we want to shrink, otherwise don't
  // shrink.
  checkShrink() {
    this.set('shrink', window.pageYOffset > 100);
  },

  actions: {
    signOut() {
      this.session.invalidate();
    }
  }
});
