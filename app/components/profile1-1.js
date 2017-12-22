import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  formName: "hostform",
  profileSrc: '/assets/images/icon_photoPreview.png',

  didInsertElement() {
    this._super(...arguments);

    // let $ = this.$.bind(this);
  },

  actions: {
    chooseProfilePic() {
      this.$('#imageUpload').click();
    },

    onProfilePic(e) {
      let files = e.target.files || [];
      let file = files[0];
      if (file) {
        this.set('profileSrc', window.URL.createObjectURL(file));
      }
    }
  }
});
