import Component from '@ember/component';
import { findBy } from 'ember-awesome-macros/array';
import raw from 'ember-awesome-macros/raw';

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

export default Component.extend({
  // Full date
  date: null,

  // Change date action
  onchange: null,

  // date component parts
  year: null,
  month: null,
  day: null,

  // Selection options
  years: null,
  months: null,
  days: null,

  // Date fields (bound into selected values in power-selects)
  selectedYear: findBy('years', raw('value'), 'year'),
  selectedMonth: findBy('months', raw('value'), 'month'),
  selectedDay: findBy('days', raw('value'), 'day'),

  init() {
    this._super(...arguments);

    this.setProperties({
      years: [],
      months: [],
      days: []
    });

    for (let i = 2000; i >= 1900; i--) {
      this.years.push({ value: i, label: `${i}` });
    }

    for (let i = 1; i <= 12; i++) {
      this.months.push({
        value: i - 1,
        label: `${('0' + i).slice(-2)} - ${months[i - 1]}`
      });
    }

    for (let i = 1; i <= 31; i++) {
      this.days.push({ value: i, label: ('0' + i).slice(-2) });
    }

    if (this.date) {
      this.setProperties({
        year: this.date.getFullYear(),
        month: this.date.getMonth(),
        day: this.date.getDate()
      });
    }
  },

  checkNotify() {
    if (this.year !== null && this.month !== null && this.day !== null) {
      this.onchange(new Date(this.year, this.month, this.day));
    }
  },

  actions: {
    setYear({ value }) {
      this.set('year', value);
      this.checkNotify();
    },

    setMonth({ value }) {
      this.set('month', value);
      this.checkNotify();
    },

    setDay({ value }) {
      this.set('day', value);
      this.checkNotify();
    }
  }
});
