import Component from '@ember/component';
import { getGenders } from '../../utils/profile';
import { findBy } from 'ember-awesome-macros/array';
import raw from 'ember-awesome-macros/raw';

export default Component.extend({
  tagName: '',

  selectedGender: findBy('genders', raw('value'), 'changeset.gender'),

  init() {
    this._super(...arguments);
    this.set('genders', getGenders());
  }
});
