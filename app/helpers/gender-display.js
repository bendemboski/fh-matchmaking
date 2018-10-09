import { helper as buildHelper } from '@ember/component/helper';
import { getGenderDisplay } from '../utils/profile';

export default buildHelper((args) => getGenderDisplay(...args));
