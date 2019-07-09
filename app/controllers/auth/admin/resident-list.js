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
      label: 'Future Aspiration',
      valuePath: 'occupation'
    },
    {
      label: 'Caseworker',
      valuePath: 'caseworker.fullName'
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
    viewProfile(column) {
      this.router.transitionTo('auth.admin.caseworker.resident', column.content.caseworker, column.content);
    },

    promptDeleteResident(row, table) {
      this.openModal('deleteResident', { row, table });
    },

    doNothing() {

    }
  }
});
