import Component from '@ember/component';

export default Component.extend({
  wrapperId: null,
  altText: null,
  url: null,

  actions: {
    choosePicture() {
      this.$('#imageUpload').click();
    },

    onPicture(e) {
      let files = e.target.files || [];
      let file = files[0];
      if (file) {
        this.get('onPicture', window.URL.createObjectURL(file));
      }
    }
  }
});
