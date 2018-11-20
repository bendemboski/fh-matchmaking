import {
  create,
  visitable,
} from 'ember-cli-page-object';
import ResidentInfoPage from '../../components/resident-info-page';
import Footer from '../../components/footer';

export default create(Object.assign({
  visit: visitable('/caseworker/resident/:resident_profile_id'),
  footer: Footer
}, ResidentInfoPage));
