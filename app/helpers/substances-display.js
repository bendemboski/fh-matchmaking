import { helper as buildHelper } from '@ember/component/helper';
import { getSubstancesDisplay } from '../utils/profile';

export default buildHelper((args) => getSubstancesDisplay(...args));
