import {
  create,
  visitable,
} from 'ember-cli-page-object';
import Footer from '../components/footer';

export default create({
  visit: visitable('/host/activities'),
  footer: Footer,

  activities: { scope: '[data-test-activities]' },
  description: { scope: '[data-test-description]' },
});
