import {
  create,
  visitable,
} from 'ember-cli-page-object';
import Footer from '../components/footer';
import PowerSelect from '../components/power-select';
import CheckBox from '../components/check-box';

export default create({
  visit: visitable('/host/location'),
  footer: Footer,

  neighborhood: PowerSelect,
  address: { scope: '[data-test-street-address]' },
  link: Object.assign({ scope: '[data-test-check-box]' }, CheckBox),
  busses: { scope: '[data-test-busses]' },
  environment: { scope: '[data-test-environment]' }
});
