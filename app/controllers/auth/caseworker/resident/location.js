import BaseController from './base';
import { computed } from '@ember/object';

function neighborhood(index) {
  return computed('changeset.neighborhoods.[]', {
    get() {
      let neighborhoods = this.changeset.get('neighborhoods') || [];
      return neighborhoods[index];
    },
    set(key, value) {
      let neighborhoods = this.changeset.get('neighborhoods') || [];
      // We have to push a different array into the changeset for its dirty
      // tracking to work properly
      neighborhoods = [...neighborhoods];
      neighborhoods[index] = value;
      this.changeset.set('neighborhoods', neighborhoods);
      return value;
    }
  });
}

function disabledNeighborhoods(index) {
  return computed('changeset.neighborhoods.[]', function() {
    let neighborhoods = this.changeset.get('neighborhoods') || [];
    let disabled = [];
    for (let i = 0; i < neighborhoods.length; i++) {
      if (i !== index && neighborhoods[i]) {
        disabled.push(neighborhoods[i]);
      }
    }
    return disabled;
  });
}

export default BaseController.extend({
  neighborhood1: neighborhood(0),
  neighborhood2: neighborhood(1),
  neighborhood3: neighborhood(2),

  disabledNeighborhoods1: disabledNeighborhoods(0),
  disabledNeighborhoods2: disabledNeighborhoods(1),
  disabledNeighborhoods3: disabledNeighborhoods(2)
});
