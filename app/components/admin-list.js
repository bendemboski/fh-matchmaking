import Component from '@ember/component';
import { computed } from '@ember/object';
import { sort } from '@ember/object/computed';

export default Component.extend({
  people: null,

  sortField: 'name',
  sortDef: computed('sortField', function() {
    return [ this.sortField ];
  }),
  sortedPeople: sort('people', 'sortDef'),

  peopleList: computed('sortedPeople.@each.name', 'filterText', function() {
    let {
      sortedPeople,
      filterText
    } = this;
    if (!filterText) {
      return sortedPeople;
    }

    filterText = filterText.toLowerCase();
    return sortedPeople.filter(({ name }) => {
      return name.toLowerCase().indexOf(filterText) !== -1;
    })
  })
});
