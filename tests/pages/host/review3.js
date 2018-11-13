import {
  create,
  visitable,
} from 'ember-cli-page-object';
import Footer from '../components/footer';
import ReviewPage from '../components/review-page';

export default create(Object.assign({
  visit: visitable('/host/review3'),
  footer: Footer
}, ReviewPage));
