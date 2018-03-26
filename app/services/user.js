import Ember from 'ember';

const { computed: { equal } } = Ember;

export default Ember.Service.extend({
  type: 'admin',

  isHost: equal('type', 'host'),
  isCaseWorker: equal('type', 'caseWorker'),
  isAdmin: equal('type', 'admin')
});
