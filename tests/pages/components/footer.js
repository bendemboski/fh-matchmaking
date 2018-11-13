import {
  clickable
} from 'ember-cli-page-object';

export default {
  scope: '[data-test-footer]',

  back: clickable('[data-test-back]'),
  next: clickable('[data-test-next]')
};
