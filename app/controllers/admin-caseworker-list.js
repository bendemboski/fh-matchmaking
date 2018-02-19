import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { sort } from '@ember/object/computed';
import moment from 'moment';

const caseworkers = [
  {
   image: '/assets/images/cwkimg_allef_vinicius.jpg',
    name: 'Allef Vinicius',
    agency: "Mary's Place",
    email: 'marysplace@gmail.com',
    mobile:'669-253-9999',
    totalnumber: '6',
    matched:'3',
  },
  {
    image: '/assets/images/cwkimg_christiana_rivers.jpg',
    name: 'Christiana Rivers',
    agency: "DESC's Main Shelter",
    email: 'desc@gmail.com',
    mobile:'669-253-9888',
    totalnumber: '5',
    matched:'3',
  },
  {
    image: '/assets/images/cwkimg_michael_frattaroli.jpg',
    name: 'Michael Frattaroli',
    agency: "Roots Young Adult Shelter",
    email: 'ryas@gmail.com',
    mobile:'669-253-9666',
    totalnumber: '3',
    matched:'1',
  },
  {
    image: '/assets/images/cwkimg_rachel_pfuetzner.jpg',
    name: 'Rachel Pfuetzner',
    agency: "Solid Ground",
    email: 'solidground@gmail.com',
    mobile:'669-253-0222',
    totalnumber: '4',
    matched:'3',
  },
];

export default Controller.extend({
  init() {
    this._super(...arguments);
    this.set('allCaseworkers', [ ...caseworkers ]);
  },

  caseworkersSort: 'name',
    caseworkersSortDef: computed('caseworkersSort', function() {
    return [ this.get('caseworkersSort') ];
  }),
  sortedCaseworkers: sort('allCaseworkers', 'caseworkersSortDef'),

  caseworkers: computed('sortedCaseworkers.@each.name', 'filterText', function() {
    let {
      sortedCaseworkers,
      filterText
    } = this.getProperties('sortedCaseworkers', 'filterText');
    if (!filterText) {
      return sortedCaseworkers;
    }

    filterText = filterText.toLowerCase();
    return sortedCaseworkers.filter(({ name }) => {
      return name.toLowerCase().indexOf(filterText) !== -1;
    })
  })
});
