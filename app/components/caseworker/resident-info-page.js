import Component from '@ember/component';
import { inject as service } from '@ember/service';
import ImageProp from '../../utils/image-prop';
import { task } from 'ember-concurrency';

export default Component.extend({
  tagName: '',

  ajax: service(),

  didInsertElement() {
    this._super(...arguments);
    this.set('profilePic', ImageProp.create({
      remoteUrl: this.changeset.get('profilePic')
    }));
  },

  willDestroyElement() {
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
