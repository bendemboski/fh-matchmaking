import Component from '@ember/component';
import { inject as service } from '@ember/service';

//
// This implements an ember-light-table for displaying a list of residents. It
// must be passed a `residents` property with an array of residents to display,
// and optionally an `onRowClick` action to handle clicking on rows.
//
export default Component.extend({
  router: service(),

  columns: Object.freeze([
    {
      valuePath: 'profilePicSrc',
      width: '70px',
      sortable: false,
      cellComponent: 'profile-pic-cell'
    },
    {
      label: 'Name',
      valuePath: 'fullName',
    },
    {
      label: 'Occupation',
      valuePath: 'occupation'
    },
    {
      label: 'Caseworker',
      valuePath: 'caseworker.fullName'
    }
  ])
});
