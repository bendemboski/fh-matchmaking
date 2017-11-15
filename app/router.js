import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
    location: config.locationType,
    rootURL: config.rootURL
});

Router.map(function () {
  this.route('signin');
  this.route('homepage_host');
  this.route('hostprofile1-1');
  this.route('hostprofile1-2');
  this.route('hostprofile1-3');
});

export default Router;
