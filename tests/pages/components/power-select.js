import {
  clickable,
  clickOnText
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
};
