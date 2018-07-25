import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { readOnly, equal } from '@ember/object/computed';
import { resolve } from 'rsvp';

export default Service.extend({
  session: service(),
  cognito: service(),
  cognitoUser: readOnly('cognito.user'),

  isHost: equal('type', 'host'),
  isGuest: equal('type', 'guest'),
  isAdmin: equal('type', 'admin'),

  load() {
    if (this.get('session.isAuthenticated')) {
      return this.cognitoUser.getUserAttributes().then((userAttributes) => {
        userAttributes.forEach((attr) => {
          this.set(attr.getName(), attr.getValue());
        });
      });
    } else {
      return resolve();
    }
  }
});
