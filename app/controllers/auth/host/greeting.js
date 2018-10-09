import ProfileBase from './profile-base';
import ImageProp from '../../../utils/image-prop';
import { task } from 'ember-concurrency';

export default ProfileBase.extend({
  setup() {
    this._super(...arguments);
    this.set('profilePic', ImageProp.create({
      remoteUrl: this.changeset.get('profilePic')
    }));
  },

  reset() {
    this.profilePic.destroy();
    this._super(...arguments);
  },

  prepareChangeset: task(function*() {
    if (this.profilePic.blob) {
      // TODO: upload profile pic and set URL on changeset
      yield null;
    }
  })
});
