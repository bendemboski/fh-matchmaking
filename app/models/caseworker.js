import User from './user';
import DS from 'ember-data';

export default User.extend({
  residents: DS.hasMany('resident-profile')
});
