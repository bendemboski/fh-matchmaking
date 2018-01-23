import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { array } from 'ember-awesome-macros';
import raw from 'ember-macro-helpers/raw';
import moment from 'moment';

const residents = [
  {
    name: 'Nick Rschlebusch',
    location: 'U District',
    occupation: 'IT Specialist',
    joined: moment().subtract(7, 'days').toDate(),
    status: 'matching'
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

  allResidents: null,

  nameFilter: '',
  locationFilter: '',
  occupationFilter: '',
  statusFilter: '',

  locations: array.sort(
    array.uniq(
      array.mapBy('allResidents', raw('location'))
    )
  ),
  occupations: array.sort(
    array.uniq(
      array.mapBy('allResidents', raw('occupation'))
    )
  ),
  statuses: array.sort(
    array.uniq(
      array.mapBy('allResidents', raw('status'))
    )
  ),

  residents: computed(
    'allResidents.@each.name',
    'nameFilter',
    'locationFilter',
    'occupationFilter',
    'statusFilter',
  function() {
    let {
      allResidents,
      nameFilter,
      locationFilter,
      occupationFilter,
      statusFilter
    } = this.getProperties(
      'allResidents',
      'nameFilter',
      'locationFilter',
      'occupationFilter',
      'statusFilter'
    );
    nameFilter = nameFilter.toLowerCase();

    return allResidents.filter(({ name, location, occupation, status }) => {
      if (nameFilter && name.toLowerCase().indexOf(nameFilter) === -1) {
        return false;
      }

      if (locationFilter && location !== locationFilter) {
        return false;
      }

      if (occupationFilter && occupation !== occupationFilter) {
        return false;
      }

      if (statusFilter && status !== statusFilter) {
        return false;
      }

      return true;
    });
  })
});
