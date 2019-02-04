import EmberObject, { computed } from '@ember/object';
import { or } from 'ember-awesome-macros';
import fetch from 'fetch';

//
// An object for managing an image property. It can have a remote URL (file
// saved to the server) and/or an objectURL (backed by a local blob).
//
// The `uploadBlob()` method will upload the local blob as a media upload and
// return a remote URL.
//
// Call destroy() when done with this object to keep us from leaking
// objectURLs.
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

  // Upload our blob as a media upload and return the download URL
  async uploadBlob(ajaxService) {
    if (!this.blob) {
      throw new Error('No blob to upload');
    }

    // Get the URL for upload/download
    let {
      uploadUrl,
      downloadUrl
    } = await ajaxService.request('/mediaUpload', {
      method: 'POST',
      contentType: 'application/json',
      data: { contentType: this.blob.type }
    });

    // Upload the file
    let response = await fetch(uploadUrl, {
      method: 'PUT',
      body: this.blob,
    });
    if (!response.ok) {
      throw new Error(await response.text());
    }

    // Now that it's uploaded, we can save the uploadUrl and discard the
    // objectUrl
    this.setProperties({
      blob: null,
      remoteUrl: downloadUrl
    });

    return downloadUrl;
  },

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
