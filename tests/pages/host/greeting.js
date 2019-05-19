import {
  create,
  visitable,
} from 'ember-cli-page-object';
import Footer from '../components/footer';
import PictureUploader from '../components/picture-uploader';

export default create({
  visit: visitable('/host/greeting'),
  footer: Footer,

  profilePic: Object.assign({
    scope: '[data-test-profile-pic]'
  }, PictureUploader),
  greeting: { scope: '[data-test-greeting]' }
});
