import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { sort } from '@ember/object/computed';
import moment from 'moment';

const residents = [
  {
    image: '/assets/images/hostimg_bill_gate.jpeg',
    name: 'Bill Gates ',
    location: 'South Lake Union',
    occupation: 'CEO',
    joined: moment().subtract(1, 'year').toDate(),
    status: 'matched'
  },
  {
    image: '/assets/images/hostimg_jimi_hendrix.jpg',
    name: 'Jimi Hendrix',
    location: 'Capitol Hill',
    occupation: 'Guitarist',
    joined: moment().subtract(900, 'days').toDate(),
    status: 'matched'
  },
  {
    image: '/assets/images/hostimg_kim_sherman.png',
    name: 'Kim Sherman',
    location: 'Medina',
    occupation: 'Housewife',
    joined: moment().subtract(6, 'hours').toDate(),
    status: 'matching'
  },
  {
    image: '/assets/images/hostimg_melinda_ gates.jpg',
    name: 'Melinda Gates',
    location: 'Medina',
    occupation: 'Philanthropist',
    joined: moment().subtract(5, 'weeks').toDate(),
    status: 'matching'
  },
  {
    image: '/assets/images/hostimg_visala_durkan.jpg',
    name: 'Visala Durkan',
    location: 'Downtown',
    occupation: 'Instructors',
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
