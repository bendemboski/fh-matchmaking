import AjaxService from 'ember-ajax/services/ajax';
import { inject as service } from '@ember/service';
import { getOwner } from '@ember/application';
import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';

export default AjaxService.extend({
  session: service(),
  accessToken: readOnly('session.data.authenticated.access_token'),

  host: null,

  init() {
    this._super(...arguments);
    let { matchmaking: { apiUrl } } = getOwner(this).resolveRegistration('config:environment');
    this.set('host', apiUrl);
  },

  headers: computed('accessToken', function() {
    return { Authorization: `Bearer ${this.accessToken}` };
  }).volatile(),
});
