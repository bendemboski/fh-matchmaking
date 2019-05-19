import {
  create,
  visitable,
} from 'ember-cli-page-object';
import Footer from '../components/footer';

export default create({
  visit: visitable('/host/question'),
  footer: Footer,

  question: { scope: '[data-test-question]' }
});
