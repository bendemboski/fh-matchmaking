import Controller, { inject as controller } from '@ember/controller';
import { readOnly } from '@ember/object/computed';

// Base host profile controller (not used for review pages)
export default Controller.extend({
  hostController: controller('auth.host'),
  profile: readOnly('hostController.profile')
});
