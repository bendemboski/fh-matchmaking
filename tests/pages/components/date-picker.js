import PowerSelect from './power-select';

export default {
  async fillIn(month, day, year) {
    await this.month.fillIn(`${('0' + month).slice(-2)} - `);
    await this.day.fillIn(day);
    await this.year.fillIn(year);
  },

  month: Object.assign({ scope: '.ember-basic-dropdown:eq(0)' }, PowerSelect),
  day: Object.assign({ scope: '.ember-basic-dropdown:eq(1)' }, PowerSelect),
  year: Object.assign({ scope: '.ember-basic-dropdown:eq(2)' }, PowerSelect)
};
