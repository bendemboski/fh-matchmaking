import DS from 'ember-data';
import { computed } from '@ember/object';
import moment from 'moment';
import { raw } from 'ember-awesome-macros';
import { join, map } from 'ember-awesome-macros/array';
import { getNeighborhoodDisplay } from '../utils/profile';

export default DS.Model.extend({
  caseworker: DS.belongsTo('caseworker'),

  // index
  profilePic: DS.attr('string'),
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  email: DS.attr('string'),
  phoneNumber: DS.attr('string'),

  // bio
  birthdate: DS.attr('date'),
  gender: DS.attr('string'),
  occupation: DS.attr('string'),
  languages: DS.attr('string'),
  kidCount: DS.attr('number'),
  petCount: DS.attr('number'),
  petBreed: DS.attr('string'),

  // about
  freeTime: DS.attr('string'),
  favoriteFood: DS.attr('string'),
  movieGenre: DS.attr('string'),
  funFact: DS.attr('string'),

  // substances
  mySubstances: DS.attr(), // array of strings
  hostSubstances: DS.attr(), // array of strings

  // location
  neighborhoods: DS.attr(), // array of strings
  link: DS.attr('boolean'),
  busses: DS.attr('string'),
  neighborhoodFeatures: DS.attr('string'),

  // relationship
  relationship: DS.attr('string'),
  interaction: DS.attr('number'),

  // question
  question: DS.attr('string'),

  fullName: computed('firstName', 'lastName', function() {
    return `${this.firstName} ${this.lastName}`.trim();
  }),

  yearsOld: computed('birthdate', function() {
    if (!this.birthdate) {
      return null;
    }

    return moment().diff(moment(this.birthdate), 'years');
  }),

  neighborhoodsDisplay: join(
    map('neighborhoods', getNeighborhoodDisplay),
    raw(', ')
  )
});
