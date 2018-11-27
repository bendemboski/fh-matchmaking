import {
  collection,
} from 'ember-cli-page-object';

export default {
  sections: collection('[data-test-review-page-section]', {
    editLink: { scope: '[data-test-edit-link]' },

    steps: collection('[data-test-checklist-item]', {
      link: { scope: '[data-test-checklist-link]' }
    })
  })
};
