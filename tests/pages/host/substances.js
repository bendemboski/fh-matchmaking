import {
  create,
  visitable,
} from 'ember-cli-page-object';
import Footer from '../components/footer';
import SubstancePicker from '../components/substance-picker';

export default create({
  visit: visitable('/host/substances'),
  footer: Footer,

  mySubstances: Object.assign({
    scope: '[data-test-substance-picker="my"]'
  }, SubstancePicker),
  residentSubstances: Object.assign({
    scope: '[data-test-substance-picker="resident"]'
  }, SubstancePicker)
});
