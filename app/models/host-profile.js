import DS from 'ember-data';
import { computed } from '@ember/object';
import { getNeighborhoodDisplay } from '../utils/profile';

export default DS.Model.extend({
  host: DS.belongsTo('host'),

  // greeting
  greeting: DS.attr('string'),

  // bio
  birthdate: DS.attr('date'),
  gender: DS.attr('string'),
  occupation: DS.attr('string'),
  languages: DS.attr('string'),
  adultCount: DS.attr('number'),
  kidCount: DS.attr('number'),
  petCount: DS.attr('number'),

  // about
  freeTime: DS.attr('string'),
  favoriteFood: DS.attr('string'),
  movieGenre: DS.attr('string'),

  // substances
  mySubstances: DS.attr(), // array of strings
  residentSubstances: DS.attr(), // array of strings

  // location
  neighborhood: DS.attr('string'),
  address: DS.attr('string'),
  link: DS.attr('boolean'),
  busses: DS.attr('string'),
  neighborhoodFeatures: DS.attr('string'),

  // activities
  backyardActivities: DS.attr('string'),
  backyardDescription: DS.attr('string'),

  // relationship
  relationship: DS.attr('string'),
  interaction: DS.attr('number'),

  // question
  question: DS.attr('string'),

  neighborhoodDisplay: computed('neighborhood', function() {
    return getNeighborhoodDisplay(this.neighborhood);
  }),

  // TODO: make this computed
  isComplete: false
});
