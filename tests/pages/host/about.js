import {
  create,
  visitable,
} from 'ember-cli-page-object';
import AboutForm from '../components/about-form';
import Footer from '../components/footer';

export default create(Object.assign({
  visit: visitable('/host/about'),
  footer: Footer
}, AboutForm));
