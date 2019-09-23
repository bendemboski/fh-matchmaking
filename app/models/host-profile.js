import DS from 'ember-data';
import { computed } from '@ember/object';
import { getNeighborhoodDisplay, getLightRailStationDisplay } from '../utils/profile';
import { or, raw } from 'ember-awesome-macros';

export default DS.Model.extend({
  host: DS.belongsTo('host'),

  // greeting
  profilePic: DS.attr('string'),
  profilePicSrc: or('profilePic', raw('/assets/images/icon_photoPreview.png')),
  profileName: DS.attr('string'),
  greeting: DS.attr('string'),

  // bio
  age: DS.attr('number'),
  gender: DS.attr('string'),
  occupation: DS.attr('string'),
  languages: DS.attr('string'),
  adultCount: DS.attr('number'),
  kidCount: DS.attr('number'),
  petCount: DS.attr('number'),
  petBreed: DS.attr('string'),

  // about
  freeTime: DS.attr('string'),
  favoriteFood: DS.attr('string'),

  // substances
  mySubstances: DS.attr(), // array of strings

  // location
  neighborhood: DS.attr('string'),
  address: DS.attr('string'),
  lightRailStation: DS.attr('string'),
  busses: DS.attr('string'),
  neighborhoodFeatures: DS.attr('string'),
  neighborhoodDescription: DS.attr('string'),

  // activities
  backyardActivities: DS.attr('string'),
  backyardDescription: DS.attr('string'),

  // photos
  photo1: DS.attr('string'),
  photo2: DS.attr('string'),
  photo3: DS.attr('string'),
  photo4: DS.attr('string'),

  // question
  question: DS.attr('string'),
  additionalNote: DS.attr('string'),

  lightRailStationDisplay: computed('lightRailStation', function() {
    return getLightRailStationDisplay(this.lightRailStation);
  }),

  neighborhoodDisplay: computed('neighborhood', function() {
    return getNeighborhoodDisplay(this.neighborhood);
  }),

  // TODO: make this computed
  isComplete: false
});
