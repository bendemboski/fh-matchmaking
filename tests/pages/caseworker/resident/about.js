import {
  create,
  visitable,
} from 'ember-cli-page-object';
import AboutForm from '../../components/about-form';
import Footer from '../../components/footer';

export default create(Object.assign({
  visit: visitable('/caseworker/resident/:resident_profile_id/about'),
  footer: Footer
}, AboutForm));
