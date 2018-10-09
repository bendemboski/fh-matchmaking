import DS from 'ember-data';

export default DS.Model.extend({
  host: DS.belongsTo('caseworker'),

  // index
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
  question: DS.attr('string')
});
