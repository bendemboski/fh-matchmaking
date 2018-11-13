import {
  clickable,
  text
} from 'ember-cli-page-object';

export default {
  value: text('[data-test-value]'),

  decrement: clickable('[data-test-decrement]'),
  increment: clickable('[data-test-increment]')
};
