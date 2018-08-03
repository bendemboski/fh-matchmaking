import NotificationsService from 'ember-cli-notifications/services/notification-messages-service';

export default NotificationsService.extend({
  error(e) {
    if (e.payload && e.payload.message) {
      // Error from API -- show message
      return this._super(e.payload.message);
    } else if (e.message) {
      // Might be an error object from AWS SDK, or an Error -- either way, show
      // message
      return this._super(e.message);
    } else if (typeof e === 'string') {
      return this._super(e);
    } else {
      return this._super('An unknown error has occurred')
    }
  }
});
