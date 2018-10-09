import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

export default Component.extend({
  tagName: 'footer',
  classNames: [ 'profile' ],

  progressBarStyle: computed('percent', function() {
    return htmlSafe(`width: ${this.percent}%`);
  })
});
