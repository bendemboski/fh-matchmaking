import Controller from '@ember/controller';
import ModalContainerMixin from '../../../mixins/modal-container';
import { inject as service } from '@ember/service';
import { readOnly } from '@ember/object/computed';
import { task } from 'ember-concurrency';

export default Controller.extend(ModalContainerMixin, {
  router: service(),

  residents: readOnly('model'),
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
      label: 'Actions',
      width: '100px',
      sortable: false,
      cellComponent: 'people-table-actions'
    }
  ]),

  deleteProfile: task(function*({ row, table }) {
    yield row.content.destroyRecord();
    table.removeRow(row);
    this.closeModal();
  }),

  actions: {
    viewResident(column) {
      this.router.transitionTo('auth.caseworker.resident.view', column.content);
    },

    editResident(row) {
      this.router.transitionTo('auth.caseworker.resident.index', row.content);
    },

    promptDeleteResident(row, table) {
      this.openModal('deleteResident', { row, table });
    },

    doNothing() {

    }
  }
});
