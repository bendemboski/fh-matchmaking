import Component from '@ember/component';
import { inject as service } from '@ember/service';

//
// This implements an ember-light-table for displaying a list of hosts. It must
// be passed a `hosts` property with an array of hosts to display, and
// optionally an `onRowClick` action to handle clicking on rows.
//
export default Component.extend({
  router: service(),

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
  ])
});
