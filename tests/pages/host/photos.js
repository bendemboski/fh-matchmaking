import {
  collection,
  create,
  visitable,
} from 'ember-cli-page-object';
import Footer from '../components/footer';
import PictureUploader from '../components/picture-uploader';

export default create({
  visit: visitable('/host/photos'),
  footer: Footer,

  photos: collection('[data-test-photo]', PictureUploader)
});
