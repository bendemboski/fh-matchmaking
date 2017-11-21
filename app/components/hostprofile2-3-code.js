import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  profileSrc_1: '/assets/images/icon_imageUpload.png',
  profileSrc_2: '/assets/images/icon_imageUpload.png',
  profileSrc_3: '/assets/images/icon_imageUpload.png',
  profileSrc_4: '/assets/images/icon_imageUpload.png',


  didInsertElement() {
    this._super(...arguments);

    // let $ = this.$.bind(this);
  },

  actions: {
    chooseProfilePic(num) {
      this.$('#imageUpload_' + num).click();
    },

    onProfilePic_1(e) {
      let files = e.target.files || [];
      let file = files[0];
      if (file) {
        this.set('profileSrc_1', window.URL.createObjectURL(file));
      }
    },
    onProfilePic_2(e) {
      let files = e.target.files || [];
      let file = files[0];
      if (file) {
        this.set('profileSrc_2', window.URL.createObjectURL(file));
      }
    },
    onProfilePic_3(e) {
      let files = e.target.files || [];
      let file = files[0];
      if (file) {
        this.set('profileSrc_3', window.URL.createObjectURL(file));
      }
    },
    onProfilePic_4(e) {
      let files = e.target.files || [];
      let file = files[0];
      if (file) {
        this.set('profileSrc_4', window.URL.createObjectURL(file));
      }
    }

  }
});
