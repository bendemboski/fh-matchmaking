import {
  create,
  visitable,
} from 'ember-cli-page-object';
import HostProfile from '../components/host-profile';
import Footer from '../components/footer';

export default create(Object.assign({
  visit: visitable('/host/profile'),
  footer: Footer
}, HostProfile));
