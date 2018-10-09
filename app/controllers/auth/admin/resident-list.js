import Controller from '@ember/controller';
import moment from 'moment';

const residents = [
  {
    image: '/assets/images/resimg_czar.png',
    name: 'Czar',
    location: 'South Lake Union',
    occupation: 'Artist',
    joined: moment().subtract(1, 'year').toDate(),
    status: 'matching'
  },
  {
    image: '/assets/images/resimg_karina.jpg',
    name: 'Karina',
    location: 'Capitol Hill',
    occupation: 'Artist',
    joined: moment().subtract(900, 'days').toDate(),
    status: 'matched'
  },
  {
    image: '/assets/images/resimg_kiki.jpg',
    name: 'Kiki',
    location: 'Medina',
    occupation: 'Mom',
    joined: moment().subtract(6, 'hours').toDate(),
    status: 'matching'
  },
  {
    image: '/assets/images/resimg_megan.jpg',
    name: 'Megan',
    location: 'Medina',
    occupation: 'Philanthropist',
    joined: moment().subtract(5, 'weeks').toDate(),
    status: 'matching'
  },
  {image: '/assets/images/resimg_nick.jpg',
    name: 'Nick Durkan',
    location: 'Downtown',
    occupation: 'Soldier(Past)',
    joined: moment().subtract(1, 'months').toDate(),
    status: 'matched'
  },
];

export default Controller.extend({
  init() {
    this._super(...arguments);
    this.set('residents', [ ...residents ]);
  }
});
