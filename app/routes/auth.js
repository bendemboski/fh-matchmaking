import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';
import { getOwner } from '@ember/application';
import Test from 'ember-simple-auth/authenticators/test';

const fakeAuthType = 'guest';

export default Route.extend(AuthenticatedRouteMixin, {
  currentUser: service(),

  triggerAuthentication() {
    return this.fakeAuth().then(() => this.set('currentUser.type', fakeAuthType));
  },

  fakeAuth() {
    let owner = getOwner(this);
    if (!owner.lookup('authenticator:test')) {
      owner.register('authenticator:test', Test);
    }
    return this.get('session').authenticate('authenticator:test', { id: 1 });
  }
});
