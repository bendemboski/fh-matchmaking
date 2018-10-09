import EmberObject, { computed } from '@ember/object';
import { or } from 'ember-awesome-macros';

//
// An object for managing an image property. It can have a remote URL (file
// saved to the server) and/or an objectURL (backed by a local blob). Call
// destroy() when done with this object to keep us from leaking objectURLs.
//
export default EmberObject.extend({
  // If the file is saved to the server, this is its URL
  remoteUrl: null,

  // blob computed setter, creates an object URL for the blob for displaying
  // the blob before it's saved to the server
  blob: computed({
    get() {
      return null;
    },
    set(key, value) {
      this._cleanup();
      if (value) {
        this.set('objectUrl', URL.createObjectURL(value));
      }
      return value;
    }
  }),
  objectUrl: null,

  // The URL, whether temporary/object or permanent/remote
  url: or('objectUrl', 'remoteUrl'),

  willDestroy() {
    this._cleanup();
    this._super(...arguments);
  },

  _cleanup() {
    if (this.objectUrl) {
      URL.revokeObjectURL(this.objectUrl);
      this.set('objectUrl', null);
    }
  }
});
