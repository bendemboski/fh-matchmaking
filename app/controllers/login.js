import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    checkTyped({ target }) {
      if (target.value) {
        target.classList.add('typed');
      } else {
        target.classList.remove('typed');
      }
    }
  }
})
