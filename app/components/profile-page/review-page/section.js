import Component from '@ember/component';

export default Component.extend({
  classNames: [ 'col-md-4', 'review-section' ],
  classNameBindings: [ 'isComplete:complete' ],
  'data-test-review-page-section': true  
});
