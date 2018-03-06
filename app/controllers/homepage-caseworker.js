import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { sort } from '@ember/object/computed';
import moment from 'moment';

const residents = [
  { image: '/assets/images/resimg_nick.jpg',
    name: 'Nick Rschlebusch',
    location: 'U District',
    occupation: 'IT Specialist',
    joined: moment().subtract(7, 'days').toDate(),
    status: 'matching'
  },
  {image: '/assets/images/resimg_czar.png',
    name: 'Czar Hendrix',
    location: 'Capitol Hill',
    occupation: 'Guitarist',
    joined: moment().subtract(900, 'days').toDate(),
    status: 'matched'
  },
  {image: '/assets/images/resimg_karina.jpg',
    name: 'Karina Gates',
    location: 'Medina',
    occupation: 'Artists',
    joined: moment().subtract(6, 'hours').toDate(),
    status: 'matching'
  },
  {image: '/assets/images/resimg_kiki.jpg',
    name: 'Kiki Gates',
    location: 'Medina',
    occupation: 'Philanthropist',
    joined: moment().subtract(5, 'weeks').toDate(),
    status: 'matching'
  },
  {image: '/assets/images/resimg_megan.jpg',
    name: 'Magan Durkan',
    location: 'Downtown',
    occupation: 'Cashier',
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
