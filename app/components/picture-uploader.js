import Component from '@ember/component';

export default Component.extend({
  classNames: [ 'picture-uploader' ],

  actions: {
    choosePicture() {
      this.element.querySelector('input[type="file"]').click();
    },

    onPicture(file) {
      if (file) {
        this.onPicture(file);
      }
    }
  }
});
