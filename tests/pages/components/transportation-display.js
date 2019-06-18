import {
  create,
  isVisible,
  text
} from 'ember-cli-page-object';

export let TransportationDisplay = {
  scope: '[data-test-transportation]',

  hasLink: isVisible('[data-test-link]'),
  hasBusses: isVisible('[data-test-busses]'),
  busses: text('[data-test-busses]'),
  hasNone: isVisible('[data-test-none]')
};

export default create(TransportationDisplay);
