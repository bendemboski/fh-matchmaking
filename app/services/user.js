import Service from '@ember/service';
import { equal } from '@ember/object/computed';

export default Service.extend({
  type: 'host',

  isHost: equal('type', 'host'),
  isCaseWorker: equal('type', 'caseWorker'),
  isAdmin: equal('type', 'admin')
});
