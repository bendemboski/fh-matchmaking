import Controller, { inject as controller } from '@ember/controller';
import { readOnly } from '@ember/object/computed';
import Changeset from 'ember-changeset';

// Base host profile controller (not used for review pages)
export default Controller.extend({
  hostController: controller('auth.host'),
  profile: readOnly('hostController.profile'),

  setup() {
    this._super(...arguments);
    this.set('changeset', new Changeset(this.profile));
  }
});
