import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function () {
  this.route('login');

  this.route('auth', { path: '' }, function() {
    // admin-only pages
    this.route('admin', function() {
      this.route('host-list');
      this.route('resident-list');

      this.route('host', { path: '/host/:host_id' });
      this.route('caseworker', { path: '/caseworker/:caseworker_id' }, function() {
        this.route('resident', { path: '/:resident_profile_id' });
      });
    });

    // host-only pages
    this.route('host', function() {
      this.route('greeting');
      this.route('bio');
      this.route('about');
      this.route('substances');
      this.route('review1');
      this.route('location');
      this.route('activities');
      this.route('photos');
      this.route('review2');
      this.route('relationship');
      this.route('question');
      this.route('review3');
      this.route('profile');
      this.route('thankyou');
    });

    // caseworker-only pages
    this.route('caseworker', function() {
      this.route('new-resident');

      // build profile pages
      this.route('resident', { path: '/resident/:resident_profile_id' }, function() {
        this.route('bio');
        this.route('about');
        this.route('substances');
        this.route('location');
        this.route('relationship');
        this.route('question');
        this.route('profile');
      });

      this.route('match', function() {
        this.route('host', { path: '/host/:host_id' }, function() {
          this.route('meet');
        });
        this.route('thankyou');
      });
    });

    this.route('account');
    this.route('faq');
    this.route('community');
  });
});

export default Router;
