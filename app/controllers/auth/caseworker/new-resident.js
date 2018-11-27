import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Controller.extend({
  store: service(),
  currentUser: service(),
  router: service(),

  profile: null,

  setup() {
    this._super(...arguments);

    this.set('profile', this.store.createRecord('resident-profile', {
      caseworker: this.currentUser.model
    }));
  },

  reset() {
    // If it's still new (hasn't been saved), then remove it from the store
    if (this.profile.isNew) {
      this.profile.unloadRecord();
    }

    this._super(...arguments);
  },

  next: task(function*() {
    // The resident index page looks just like this page, but is for editing an
    // existing profile rather than creating a new one. We want to navigate the
    // user the the bio page to continue building the profile, but first replace
    // our self with the resident index route, so if they go back they are
    // editing their newly-created profile rather than starting another new one.
    yield this.profile.save();
    yield this.router.replaceWith('auth.caseworker.resident.index', this.profile);
    yield this.router.transitionTo('auth.caseworker.resident.bio', this.profile);
  })
})
