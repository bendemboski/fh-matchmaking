import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { sort } from '@ember/object/computed';
import moment from 'moment';

const residents = [
  {
  // { image: '/images/hostimg.png',
    name: 'Kim Sherman',
    location: 'South Lake Union',
    occupation: 'Housewife',
    joined: moment().subtract(1, 'year').toDate(),
    status: 'matched'
  },
  {
    name: 'Jimi Hendrix',
    location: 'Capitol Hill',
    occupation: 'Guitarist',
    joined: moment().subtract(900, 'days').toDate(),
    status: 'matched'
  },
  {
    name: 'Bill Gates',
    location: 'Medina',
    occupation: 'CEO',
    joined: moment().subtract(6, 'hours').toDate(),
    status: 'matching'
  },
  {
    name: 'Melinda Gates',
    location: 'Medina',
    occupation: 'Philanthropist',
    joined: moment().subtract(5, 'weeks').toDate(),
    status: 'matching'
  },
  {
    name: 'Jenny Durkan',
    location: 'Downtown',
    occupation: 'Mayor',
    joined: moment().subtract(1, 'months').toDate(),
    status: 'matched'
  },
];

export default Controller.extend({
  init() {
    this._super(...arguments);
    this.set('allResidents', [ ...residents ]);
  },

  residentsSort: 'name',
  residentsSortDef: computed('residentsSort', function() {
    return [ this.get('residentsSort') ];
  }),
  sortedResidents: sort('allResidents', 'residentsSortDef'),

  residents: computed('sortedResidents.@each.name', 'filterText', function() {
    let {
      sortedResidents,
      filterText
    } = this.getProperties('sortedResidents', 'filterText');
    if (!filterText) {
      return sortedResidents;
    }

    filterText = filterText.toLowerCase();
    return sortedResidents.filter(({ name }) => {
      return name.toLowerCase().indexOf(filterText) !== -1;
    })
  })
});