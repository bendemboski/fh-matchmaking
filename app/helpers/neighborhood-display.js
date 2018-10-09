import { helper as buildHelper } from '@ember/component/helper';
import { getNeighborhoodDisplay } from '../utils/profile';

export default buildHelper((args) => getNeighborhoodDisplay(...args));
