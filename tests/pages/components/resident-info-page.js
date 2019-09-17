import PictureUploader from '../components/picture-uploader';

export default {
  profilePic: Object.assign({
    scope: '[data-test-profile-pic]'
  }, PictureUploader),

  firstName: { scope: '[data-test-first-name]' },
  lastName: { scope: '[data-test-last-name]' },
  email: { scope: '[data-test-email]' },
  phoneNumber: { scope: '[data-test-phone-number]' },
  funFact: { scope: '[data-test-fun-fact]' }
};
