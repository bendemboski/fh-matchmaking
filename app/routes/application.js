import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import { task } from 'ember-concurrency';

export default Route.extend(ApplicationRouteMixin, {
  currentUser: service(),

  routeAfterAuthentication: 'auth.home',

  beforeModel() {
    return this._loadCurrentUser.perform();
  },

  sessionAuthenticated() {
    let fn = this._super.bind(this, ...arguments);
    this.currentUser.load.perform().then(fn);
  },

  _loadCurrentUser: task(function*() {
    try {
      yield this.currentUser.load.perform();
    } catch (e) {
      this.session.invalidate();
    }
  })
});
