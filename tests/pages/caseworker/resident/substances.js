import {
  create,
  visitable,
} from 'ember-cli-page-object';
import Footer from '../../components/footer';
import SubstancePicker from '../../components/substance-picker';

export default create({
  visit: visitable('/caseworker/resident/:resident_profile_id/substances'),
  footer: Footer,

  mySubstances: Object.assign({
    scope: '[data-test-substance-picker="my"]'
  }, SubstancePicker),
  hostSubstances: Object.assign({
    scope: '[data-test-substance-picker="host"]'
  }, SubstancePicker)
});
