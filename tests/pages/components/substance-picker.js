import {
  collection,
  create
} from 'ember-cli-page-object';
import CheckBox from './check-box';

export let SubstancePicker = {
  substances: collection('[data-test-check-box]', CheckBox),

  async chooseSubstances(substances) {
    for (let substance of this.substances) {
      await substance.fillIn(substances.includes(substance.name));
    }
  }
};

export default create(SubstancePicker);
