import {
  clickable,
  hasClass,
  text
} from 'ember-cli-page-object';

export default {
  name: text(),

  isChecked: hasClass('checked'),
  toggle: clickable(),

  async fillIn(checked) {
    if (this.isChecked !== Boolean(checked)) {
      await this.toggle();
    }
  }
}