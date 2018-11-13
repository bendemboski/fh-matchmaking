import {
  collection,
} from 'ember-cli-page-object';
import CheckBox from './check-box';

export default {
  substances: collection('[data-test-check-box]', CheckBox),

  async chooseSubstances(substances) {
    for (let substance of this.substances) {
      await substance.fillIn(substances.includes(substance.name));
    }
  }
};
