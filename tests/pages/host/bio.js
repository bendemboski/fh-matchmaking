import {
  create,
  visitable,
} from 'ember-cli-page-object';
import BioForm from '../components/bio-form';
import Footer from '../components/footer';

export default create(Object.assign({
  visit: visitable('/host/bio'),
  footer: Footer
}, BioForm));
