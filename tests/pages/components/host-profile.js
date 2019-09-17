import {
  attribute,
  collection,
  isVisible,
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
  petBreed: text('[data-test-pet-breed]'),
  greeting: text('[data-test-greeting]'),

  hasLightRailStation: isVisible('[data-test-light-rail-station]'),
  lightRailStation: text('[data-test-light-rail-station]'),
  hasBusses: isVisible('[data-test-busses]'),
  busses: text('[data-test-busses]'),
  hasNoTransit: isVisible('[data-test-none]'),

  environment: text('[data-test-environment]'),
  backyardActivities: text('[data-test-backyard-activities]'),
  backyardDescription: text('[data-test-backyard-description]'),
  languages: text('[data-test-languages]'),
  freeTime: text('[data-test-free-time]'),
  favoriteFood: text('[data-test-favorite-food]'),
  usedSubstances: text('[data-test-used-substances]'),
  question: text('[data-test-question]')
};
