import Component from '@ember/component';
import { conditional, equal, typeOf, raw } from 'ember-awesome-macros';

export default Component.extend({
  tagName: '',

  interaction: conditional(
    equal(
      typeOf('changeset.interaction'),
      raw('number')
    ),
    'changeset.interaction',
    raw('3')
  ),

  actions: {
    setInteraction(val) {
      this.changeset.set('interaction', parseInt(val, 10));
    }
  }
});
