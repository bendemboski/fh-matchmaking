import { helper as buildHelper } from '@ember/component/helper';
import { getMovieGenreDisplay } from '../utils/profile';

export default buildHelper((args) => getMovieGenreDisplay(...args));
