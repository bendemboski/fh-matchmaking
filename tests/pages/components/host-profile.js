import {
  attribute,
  collection,
  text
} from 'ember-cli-page-object';

export default {
  photos: collection('[data-test-photo]', {
    src: attribute('src')
  }),
  profilePic: attribute('src', '[data-test-profile-pic]'),
  name: text('[data-test-name]'),
  gender: text('[data-test-gender]'),
  age: text('[data-test-age]'),
  occupation: text('[data-test-occupation]'),
  neighborhood: text('[data-test-neighborhood]'),
  adultCount: text('[data-test-adult-count]'),
  kidCount: text('[data-test-kid-count]'),
  petCount: text('[data-test-pet-count]'),
  greeting: text('[data-test-greeting]'),
  environment: text('[data-test-environment]'),
  languages: text('[data-test-languages]'),
  freeTime: text('[data-test-free-time]'),
  favoriteFood: text('[data-test-favorite-food]'),
  movieGenre: text('[data-test-movie-genre]'),
  usedSubstances: text('[data-test-used-substances]'),
  question: text('[data-test-question]')
};
