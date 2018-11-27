import {
  create,
  visitable,
} from 'ember-cli-page-object';
import BioForm from '../../components/bio-form';
import Footer from '../../components/footer';

export default create(Object.assign({
  visit: visitable('/caseworker/resident/:resident_profile_id/bio'),
  footer: Footer
}, BioForm));
