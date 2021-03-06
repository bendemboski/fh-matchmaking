import { helper } from '@ember/component/helper';

export function preventDefault([ action ]) {
  return function(e) {
    e.stopPropagation();
    if (action) {
      return action(e);
    }
  };
}

export default helper(preventDefault);
