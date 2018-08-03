import NotificationsService from 'ember-cli-notifications/services/notification-messages-service';

export default NotificationsService.extend({
  error(e, { preamble } = {}) {
    let message = buildMessage(e);
    if (preamble) {
      message = `${preamble}: ${message}`;
    }
    this._super(message);
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
