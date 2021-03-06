import PowerSelect from '../components/power-select';
import NumberInput from '../components/number-input';

export default {
  age: { scope: '[data-test-age]' },
  gender: Object.assign({ scope: '[data-test-gender]'}, PowerSelect),

  occupation: { scope: '[data-test-occupation]' },
  languages: { scope: '[data-test-languages]' },

  adultCount: Object.assign({ scope: '[data-test-adult-count]' }, NumberInput),
  kidCount: Object.assign({ scope: '[data-test-kid-count]' }, NumberInput),
  petCount: Object.assign({ scope: '[data-test-pet-count]' }, NumberInput),

  petBreed: { scope: '[data-test-pet-breed]' }
};
