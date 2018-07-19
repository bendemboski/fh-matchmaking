import Component from '@ember/component';

export default Component.extend({
  elementId: 'profile-container',
  profileSrc: '/assets/images/icon_photoPreview.png',

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
