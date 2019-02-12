import Component from '@ember/component';
import Table from 'ember-light-table';

//
// ember-light-table wrapper that implements our local sorting behavior. Must
// be passed a `columns` property that is the columns to pass to the
// `light-table`, a `people` property that is an array of models to display,
// and optionally an `onRowClick` action to handle clicks on rows.
//
export default Component.extend({
  tagName: '',

  columns: null,
  people: null,

  table: null,

  init() {
    this._super(...arguments);

    let { valuePath: sort } = this.columns.find(({ sortable }) => sortable !== false);
    this.set('table', new Table(this.columns, this.people.sortBy(sort)));
  },

  actions: {
    onColumnClick(column) {
      if (column.sorted) {
        let sortedPeople = this.people.sortBy(column.valuePath);
        if (!column.ascending) {
          sortedPeople.reverse();
        }
        this.table.setRows(sortedPeople);
      }
    }
  }
});
