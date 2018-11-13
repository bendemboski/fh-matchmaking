import Controller, { inject as controller } from '@ember/controller';
import { inject as service } from '@ember/service';
import { readOnly } from '@ember/object/computed';

// Base host profile controller (not used for review pages)
export default Controller.extend({
  hostController: controller('auth.host'),
  currentUser: service(),

  user: readOnly('currentUser.model'),
  profile: readOnly('hostController.profile')
});
