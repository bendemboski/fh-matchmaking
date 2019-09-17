import { helper as buildHelper } from '@ember/component/helper';
import { getLightRailStationDisplay } from '../utils/profile';

export default buildHelper((args) => getLightRailStationDisplay(...args));
