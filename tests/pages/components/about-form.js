import PowerSelect from './power-select';
import { SubstancePicker } from './substance-picker';

export default {
  freeTime: { scope: '[data-test-free-time]' },
  favoriteFood: { scope: '[data-test-favorite-food]' },
  movieGenre: Object.assign({ scope: '[data-test-movie-genre]' }, PowerSelect),
  funFact: { scope: '[data-test-fun-fact]' },
  substancePicker: SubstancePicker
};
