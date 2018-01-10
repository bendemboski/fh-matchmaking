import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  formName: "hostform",
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

    onProfilePic(num,e) {
      let files = e.target.files || [];
      let file = files[0];
      if (file) {
        this.set('profileSrc_'+ num , window.URL.createObjectURL(file));
      }
    }

  }
});
