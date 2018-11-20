import {
  create,
  visitable,
} from 'ember-cli-page-object';
import Footer from '../../components/footer';

export default create({
  visit: visitable('/caseworker/resident/:resident_profile_id/question'),
  footer: Footer,

  question: { scope: '[data-test-question]' }
});
