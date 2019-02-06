import ProfileBase from './profile-base';
import { inject as service } from '@ember/service';
import ImageProp from '../../../utils/image-prop';
import { task } from 'ember-concurrency';

export default ProfileBase.extend({
  ajax: service(),

  emptySrc: '/assets/images/icon_imageUpload.png',

  setup() {
    this._super(...arguments);
    this.setProperties({
      photo1: ImageProp.create({ remoteUrl: this.changeset.get('photo1') }),
      photo2: ImageProp.create({ remoteUrl: this.changeset.get('photo2') }),
      photo3: ImageProp.create({ remoteUrl: this.changeset.get('photo3') }),
      photo4: ImageProp.create({ remoteUrl: this.changeset.get('photo4') }),
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
      if (this.photo1.blob) {
        let url = yield this.photo1.uploadBlob(this.ajax);
        this.changeset.set('photo1', url);
      }
    }

    if (this.photo2.blob) {
      if (this.photo2.blob) {
        let url = yield this.photo2.uploadBlob(this.ajax);
        this.changeset.set('photo2', url);
      }
    }

    if (this.photo3.blob) {
      if (this.photo3.blob) {
        let url = yield this.photo3.uploadBlob(this.ajax);
        this.changeset.set('photo3', url);
      }
    }

    if (this.photo4.blob) {
      if (this.photo4.blob) {
        let url = yield this.photo4.uploadBlob(this.ajax);
        this.changeset.set('photo4', url);
      }
    }
  })
});
