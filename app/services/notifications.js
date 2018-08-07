import NotificationsService from 'ember-cli-notifications/services/notification-messages-service';

export default NotificationsService.extend({
  error(e, options = {}) {
    let { preamble } = options;

    let message = buildMessage(e);
    if (preamble) {
      message = `${preamble}: ${message}`;
    }

    this._super(message, options);
  },

  // work around un-customizable styles
  addNotification(options) {
    options = Object.assign({}, options);
    options.type = options.type || 'info';

    let extraClass = `notification-${options.type}`;
    if (options.cssClasses) {
      options.cssClasses = `${extraClass} ${options.cssClasses}`;
    } else {
      options.cssClasses = extraClass;
    }

    return this._super(options);
  }
});

function buildMessage(e) {
  if (e.payload && e.payload.message) {
    // Error from our API -- show message
    return e.payload.message;
  } else if (e.message) {
    // Error object from AWS SDK or generic error
    return e.message;
  } else if (typeof e === 'string') {
    return e;
  } else {
    return 'An unknown error has occurred';
  }
}
