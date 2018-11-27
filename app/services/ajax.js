import AjaxService from 'ember-ajax/services/ajax';
import { inject as service } from '@ember/service';
import ENV from '../config/environment';
import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';

const { api: { host, namespace } } = ENV;

export default AjaxService.extend({
  session: service(),
  accessToken: readOnly('session.data.authenticated.access_token'),

  host,
  namespace,

  headers: computed('accessToken', function() {
    return { Authorization: `Bearer ${this.accessToken}` };
  }).volatile(),
});
