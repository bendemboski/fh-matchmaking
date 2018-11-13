import {
  create,
  visitable,
} from 'ember-cli-page-object';
import Footer from '../components/footer';

export default create({
  visit: visitable('/host/relationship'),
  footer: Footer,

  relationship: { scope: '[data-test-relationship]' },
  interactionLevel: { scope: '[data-test-interaction-level]' }
});
