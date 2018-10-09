import Component from '@ember/component';
import { getMovieGenres } from '../../utils/profile';
import { findBy } from 'ember-awesome-macros/array';
import raw from 'ember-awesome-macros/raw';

export default Component.extend({
  tagName: '',

  selectedMovieGenre: findBy('movieGenres', raw('value'), 'changeset.movieGenre'),

  init() {
    this._super(...arguments);
    this.set('movieGenres', getMovieGenres());
  }
});
