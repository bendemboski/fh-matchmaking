import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { readOnly } from '@ember/object/computed';

export default Controller.extend({
  router: service(),

  hosts: readOnly('model'),
  columns: Object.freeze([
    {
      valuePath: 'profile.profilePicSrc',
      width: '70px',
      sortable: false,
      cellComponent: 'profile-pic-cell'
    },
    {
      label: 'Name',
      valuePath: 'fullName',
    },
    {
      label: 'Neighborhood',
      valuePath: 'profile.neighborhoodDisplay'
    },
    {
      label: 'Occupation',
      valuePath: 'profile.occupation'
    },
    {
      label: 'Greeting',
      valuePath: 'profile.greeting',
      sortable: false
    },
  ]),

  actions: {
    viewProfile(column) {
      this.router.transitionTo('auth.admin.host', column.content);
    }
  }
});
