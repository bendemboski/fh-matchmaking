import {
  create,
  visitable,
} from 'ember-cli-page-object';
import Footer from '../components/footer';

export default create({
  visit: visitable('/host/photos'),
  footer: Footer
});
