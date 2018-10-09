import Controller, { inject as controller } from '@ember/controller';
import { readOnly } from '@ember/object/computed';
import Changeset from 'ember-changeset';

// Base resident controller
export default Controller.extend({
  residentController: controller('auth.caseworker.resident'),
  profile: readOnly('residentController.profile'),

  setup() {
    this._super(...arguments);
    this.set('changeset', new Changeset(this.profile));
  }
});
