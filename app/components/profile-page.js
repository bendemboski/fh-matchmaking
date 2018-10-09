import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  classNames: [ 'container', 'profile-page' ],

  notifications: service(),
  router: service(),

  // The changeset we're operating on
  changeset: null,
  // The route to transition to after successfully submitting
  nextRoute: null,
  // The action to perform after successfully submitting (overrides nextRoute)
  nextAction: null,
  // An optional action to perform before validating/committing the changeset.
  // Can return a promise.
  prepareChangeset: null,

  submit: task(function*() {
    if (this.prepareChangeset) {
      yield this.prepareChangeset();
    }

    if (this.changeset.isDirty) {
      yield this.changeset.validate();
      if (this.changeset.isInvalid) {
        this.changeset.errors.forEach(({ validation }) => this.notifications.error(validation));
        return;
      }

      yield this.changeset.save();
    }

    if (this.nextAction) {
      yield this.nextAction();
    } else {
      yield this.router.transitionTo(this.nextRoute);
    }
  }),

  actions: {
    onClickNext() {
      this.element.querySelector('[data-submit-form]').click();
    }
  }
});
