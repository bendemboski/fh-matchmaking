import User from './user';
import DS from 'ember-data';

export default User.extend({
  profile: DS.belongsTo('host-profile')
});
