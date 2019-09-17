import {
  create,
  visitable,
} from 'ember-cli-page-object';
import Footer from '../components/footer';
import PowerSelect from '../components/power-select';

export default create({
  visit: visitable('/host/location'),
  footer: Footer,

  neighborhood: Object.assign({ scope: '[data-test-neighborhood]' }, PowerSelect),
  address: { scope: '[data-test-street-address]' },
  lightRailStation: Object.assign({ scope: '[data-test-light-rail-station]' }, PowerSelect),
  busses: { scope: '[data-test-busses]' },
  environment: { scope: '[data-test-environment]' }
});
