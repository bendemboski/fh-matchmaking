import Component from '@ember/component';
import { computed } from '@ember/object';
import { sort } from '@ember/object/computed';

export default Component.extend({
  people: null,

  sortField: 'name',
  sortDef: computed('sortField', function() {
    return [ this.get('sortField') ];
  }),
  sortedPeople: sort('people', 'sortDef'),

  peopleList: computed('sortedPeople.@each.name', 'filterText', function() {
    let {
      sortedPeople,
      filterText
    } = this.getProperties('sortedPeople', 'filterText');
    if (!filterText) {
      return sortedPeople;
    }

    filterText = filterText.toLowerCase();
    return sortedPeople.filter(({ name }) => {
      return name.toLowerCase().indexOf(filterText) !== -1;
    })
  })
});
