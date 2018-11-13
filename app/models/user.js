import DS from 'ember-data';
import { computed } from '@ember/object';
import moment from 'moment';

export default DS.Model.extend({
  email: DS.attr('string'),
  givenName: DS.attr('string'),
  familyName: DS.attr('string'),
  phoneNumber: DS.attr('string'),
  birthdate: DS.attr('date'),

  fullName: computed('givenName', 'familyName', function() {
    return `${this.givenName} ${this.familyName}`.trim();
  }),

  yearsOld: computed('birthdate', function() {
    if (!this.birthdate) {
      return null;
    }

    return moment().diff(moment(this.birthdate), 'years');
  })
});
