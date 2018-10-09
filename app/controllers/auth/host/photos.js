import ProfileBase from './profile-base';
import ImageProp from '../../../utils/image-prop';
import { task } from 'ember-concurrency';

export default ProfileBase.extend({
  emptySrc: '/assets/images/icon_imageUpload.png',

  setup() {
    this._super(...arguments);
    let photos = this.changeset.get('backyardPhotos') || [];
    this.setProperties({
      photo1: ImageProp.create({ remoteUrl: photos[0] }),
      photo2: ImageProp.create({ remoteUrl: photos[1] }),
      photo3: ImageProp.create({ remoteUrl: photos[2] }),
      photo4: ImageProp.create({ remoteUrl: photos[3] }),
    });
  },

  reset() {
    this.photo1.destroy();
    this.photo2.destroy();
    this.photo3.destroy();
    this.photo4.destroy();
    this._super(...arguments);
  },

  prepareChangeset: task(function*() {
    if (this.photo1.blob) {
      // TODO: upload photo and set URL on changeset
      yield null;
    }
    if (this.photo2.blob) {
      // TODO: upload photo and set URL on changeset
      yield null;
    }
    if (this.photo3.blob) {
      // TODO: upload photo and set URL on changeset
      yield null;
    }
    if (this.photo4.blob) {
      // TODO: upload photo and set URL on changeset
      yield null;
    }
  })
});
