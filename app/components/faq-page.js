

import Component from '@ember/component';

export default Component.extend({
    didInsertElement() {
      this._super(...arguments);

      // let $ = this.$.bind(this);
    },

  //
  //     actions: {
  //       expandAnswer() {
  //         this.toggleProperty('isShowingAnswer').slideDown();
  //       }
  //     }
  //
});
