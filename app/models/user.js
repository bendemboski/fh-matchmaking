import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
  email: DS.attr('string'),
  givenName: DS.attr('string'),
  familyName: DS.attr('string'),
  phoneNumber: DS.attr('string'),
  birthdate: DS.attr('date'),

  fullName: computed('givenName', 'familyName', function() {
    return `${this.givenName} ${this.familyName}`.trim();
  })
});
