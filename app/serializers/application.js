import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  keyForAttribute(key) {
    // By default Ember dasherizes, but our API uses camelCase
    return key;
  }
});
