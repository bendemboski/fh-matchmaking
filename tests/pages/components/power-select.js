import {
  attribute,
  clickable,
  clickOnText,
  collection
} from 'ember-cli-page-object';
import { getter } from 'ember-cli-page-object/macros';
import { findElement } from 'ember-cli-page-object/extend';

export default {
  value: getter(function() {
    let el = findElement(this, '.ember-power-select-selected-item')[0];
    return el ? el.textContent.trim() : '';
  }),
  async fillIn(value) {
    await this.open();
    await this.choose(value);
  },

  open: clickable('.ember-power-select-trigger'),
  choose: clickOnText('.ember-power-select-option'),

  isDisabled: attribute('aria-disabled', '.ember-power-select-trigger'),
  items: collection('.ember-power-select-option', {
    isDisabled: attribute('aria-disabled')
  })
};
