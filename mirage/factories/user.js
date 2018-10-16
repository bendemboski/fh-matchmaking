import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  email() {
    return faker.internet.email();
  },

  givenName() {
    return faker.name.firstName();
  },

  familyName() {
    return faker.name.lastName();
  },

  phoneNumber() {
    return faker.phone.phoneNumber();
  },

  birthdate() {
    return faker.date.past();
  }
});
