import Mixin from '@ember/object/mixin';

export default Mixin.create({
  modalName: null,
  modalContext: null,

  init() {
    this._super(...arguments);

    this.setProperties({
      openModal: (name, context) => {
        // If we're called from an action without a context, the context will be
        // the event object, but we want it to be {}.
        if (context instanceof Event) {
          context = {}
        }

        this.setProperties({
          modalName: name,
          modalContext: context || {}
        });
      },
      closeModal: (actionToCall, ...args) => {
        let context = this.get('modalContext');
        this.setProperties({
          modalName: null,
          modalContext: null
        });
        if (actionToCall) {
          actionToCall(context, ...args);
        }
      }
    });
  }
});
