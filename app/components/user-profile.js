import Component from '@ember/component';
import { or, not } from 'ember-awesome-macros';

export default Component.extend({
  isMyProfile: false,

  // Until we have actual user data to look at -- hosts can only see their own
  // profile, and we set isMyProfile=false when guests are viewing a host's
  // profile.
  isHostProfile: or('currentUser.isHost', not('isMyProfile'))
});
