import { attribute } from 'ember-cli-page-object';
import { findElementWithAssert } from 'ember-cli-page-object/extend';
import { triggerEvent } from '@ember/test-helpers';

export default {
  src: attribute('src', '[data-test-img]'),

  async setImage(file) {
    let input = findElementWithAssert(this, '[data-test-input]')[0];

    // This hack is here since we can't mock out the
    // FileList API easily; we're taking advantage
    // that we can mutate the FileList DOM API at
    // runtime to allow us to push files into the <input>
    let files = [ file ];
    input.files.item = (idx) => files[idx];
    input.files.size = files.length;

    return await triggerEvent(input, 'change', files);
  }
};
