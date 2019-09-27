import {
  create,
  visitable,
} from 'ember-cli-page-object';
import Footer from '../../components/footer';
import PowerSelect from '../../components/power-select';

export default create({
  visit: visitable('/caseworker/resident/:resident_profile_id/location'),
  footer: Footer,

  neighborhood1: Object.assign({ scope: '[data-test-neighborhood1]' }, PowerSelect),
  neighborhood2: Object.assign({ scope: '[data-test-neighborhood2]' }, PowerSelect),
  neighborhood3: Object.assign({ scope: '[data-test-neighborhood3]' }, PowerSelect),
  features: { scope: '[data-test-features]' }
});
