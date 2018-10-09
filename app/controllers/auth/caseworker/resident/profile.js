import Controller, { inject as controller } from '@ember/controller';
import { readOnly } from '@ember/object/computed';

// Base resident controller
export default Controller.extend({
  residentController: controller('auth.caseworker.resident'),
  profile: readOnly('residentController.profile')
});
