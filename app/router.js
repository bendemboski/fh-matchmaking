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
  this.route('hostprofile1-4');
  this.route('hostprofile2-1');
  this.route('hostprofile2-2');
  this.route('hostprofile2-3');
  this.route('hostprofile3-1');
  this.route('hostprofile3-2');
  this.route('hostsaving1');
  this.route('hostsaving2');
  this.route('hostsaving3');
  this.route('previewpage_host');
  this.route('community');
});

export default Router;
