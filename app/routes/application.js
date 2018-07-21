import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import { getOwner } from '@ember/application';
import Test from 'ember-simple-auth/authenticators/test';

const fakeAuthType = 'guest';

export default Route.extend(ApplicationRouteMixin, {
  currentUser: service(),

  routeAfterAuthentication: 'auth.home',

  beforeModel() {
    if (fakeAuthType) {
      return this.fakeAuth().then(() => this.set('currentUser.type', fakeAuthType));
    } else {
      return this._loadCurrentUser();
    }
  },

  sessionAuthenticated() {
    this._super(...arguments);
    this._loadCurrentUser();
  },

  _loadCurrentUser() {
    if (fakeAuthType) {
      return;
    }
    return this.get('currentUser').load().catch(() => this.get('session').invalidate());
  },

  fakeAuth() {
    let owner = getOwner(this);
    if (!owner.lookup('authenticator:test')) {
      owner.register('authenticator:test', Test);
    }
    return this.get('session').authenticate('authenticator:test', { id: 1 });
  }
});
