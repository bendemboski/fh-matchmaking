import ProfileBase from './profile-base';
import { inject as service } from '@ember/service';
import ImageProp from '../../../utils/image-prop';
import { task } from 'ember-concurrency';

export default ProfileBase.extend({
  ajax: service(),

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
      let url = yield this.profilePic.uploadBlob(this.ajax);
      this.changeset.set('profilePic', url);
    }
  })
});
