import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function () {
  this.route('auth', { path: '' }, function() {
    this.route('home', { path: '' });
    this.route('account');

    this.route('profile', function() {
      this.route('1-1');
      this.route('1-2');
      this.route('1-3');
      this.route('1-4');
      this.route('1-save');
      this.route('2-1');
      this.route('2-2');
      this.route('2-3');
      this.route('2-save');
      this.route('3-1');
      this.route('3-2');
      this.route('3-save');

      this.route('view');
      this.route('thankyou');
    });

    this.route('match', function() {
      this.route('profile');
      this.route('meet');
      this.route('thankyou');
    });

    this.route('admin', function() {
      this.route('host-list');
      this.route('resident-list');
    });

    this.route('faq');
    this.route('community');
  });
});

export default Router;
