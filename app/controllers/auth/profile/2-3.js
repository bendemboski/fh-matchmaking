import Controller from '@ember/controller';

export default Controller.extend({
  init() {
    this._super(...arguments);

    this.set('backyardPics', [
      '/assets/images/icon_photoPreview.png',
      '/assets/images/icon_photoPreview.png',
      '/assets/images/icon_photoPreview.png',
      '/assets/images/icon_photoPreview.png'
    ])
  },

  actions: {
    setBackyardPic(index, url) {
      this.get('backyardPics').replace(index, 1, url);
    }
  }
})
