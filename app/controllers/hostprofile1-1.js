import Ember from 'ember';

const {
  $,
  Controller
} = Ember;

const profileIconSrc = '/assets/images/icon_user.png';

export default Controller.extend({
  profileSrc: null,

  setup() {
    this.set('profileSrc', profileIconSrc);
  },

  actions: {
    chooseProfilePic() {
      $('#imageUpload').click();
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
