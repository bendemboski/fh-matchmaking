import {
  attribute,
  create,
  text,
  visitable,
} from 'ember-cli-page-object';
import Footer from '../../components/footer';

export default create({
  visit: visitable('/caseworker/resident/:resident_profile_id/profile'),
  footer: Footer,

  profilePic: attribute('src', '[data-test-profile-pic]'),
  name: text('[data-test-name]'),
  gender: text('[data-test-gender]'),
  age: text('[data-test-age]'),
  occupation: text('[data-test-occupation]'),
  kidCount: text('[data-test-kid-count]'),
  petCount: text('[data-test-pet-count]'),
  petBreed: text('[data-test-pet-breed]'),
  neighborhoods: text('[data-test-neighborhoods]'),

  environment: text('[data-test-environment]'),
  languages: text('[data-test-languages]'),
  freeTime: text('[data-test-free-time]'),
  favoriteFood: text('[data-test-favorite-food]'),
  acceptableSubstances: text('[data-test-acceptable-substances]'),
  question: text('[data-test-question]')
});
