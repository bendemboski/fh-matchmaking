import Ember from 'ember';

export default Ember.Component.extend({
/* Number Incrementation */
  formName: "hostform",
  adultCount: 1,
  kidCount: 0,
  petCount: 0,
  familyPanelShow: false,
  morePanelShow: false,

  didInsertElement() {
    this._super(...arguments);

    // let $ = this.$.bind(this);
  },

  actions: {
    increment(propName) {
      this.incrementProperty(propName);
    },

    decrement(propName) {
      this.decrementProperty(propName);
    },

    familyFilterShow() {
      if (this.familyPanelShow) {
        this.set('familyPanelShow', false);
      } else {
          this.set('familyPanelShow', true);
      }
      this.set('morePanelShow', false);
    },

    familyFilterHide() {
      this.set('familyPanelShow', false);
    },

    moreFilterShow() {
      if(this.morePanelShow){
      this.set('morePanelShow', false);
    } else{
      this.set('morePanelShow', true);
    }
    this.set('familyPanelShow', false)
    },

    moreFilterHide() {
      this.set('morePanelShow', false);
    },
  }
});
