import Component from '@ember/component';
import { getNeighborhoods } from '../utils/profile';
import { computed, set } from '@ember/object';

export default Component.extend({
  tagName: '',

  // Specified values of neighborhoods that should be disabled
  disabledOptions: computed({
    get() {
      return [];
    },
    set(key, value) {
      this.updateDisabledOptions(value);
      return value;
    }
  }),

  // computed property evaluating to the object in neighborhoodOptions that is
  // currently selected
  selectedNeighborhood: computed('neighborhood', function() {
    for (let option of this.flatOptions()) {
      if (option.value === this.neighborhood) {
        return option;
      }
    }
  }),

  init() {
    this._super(...arguments);

    this.set('neighborhoodOptions', getNeighborhoods());
    this.updateDisabledOptions();
  },

  updateDisabledOptions(disabledOptions = this.disabledOptions) {
    for (let option of this.flatOptions()) {
      set(option, 'disabled', disabledOptions.includes(option.value));
    }
  },

  *flatOptions() {
    let groups = this.neighborhoodOptions || [];
    for (let { options } of groups) {
      for (let option of options) {
        yield option;
      }
    }
  }
});
