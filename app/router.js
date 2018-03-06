import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
    location: config.locationType,
    rootURL: config.rootURL
});

Router.map(function () {
  this.route('signin');
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
  this.route('community');
  this.route('residentprofile1-1');
  this.route('residentprofile1-2');
  this.route('residentprofile1-3');
  this.route('residentprofile1-4');
  this.route('residentprofile2-1');
  this.route('residentprofile3-1');
  this.route('residentprofile3-2');
  this.route('thankyoupage-host');
  this.route('thankyoupage-resident');
  this.route('signin-page');
  this.route('accountpage-host');
  this.route('faqpage-host');
  this.route('matchingpage-resident');
  this.route('thankyoupage-matching');
  this.route('admin-host-list');
  this.route('admin-resident-list');
  this.route('admin-caseworker-list');
  this.route('homepage-host');
  this.route('accountpage-admin');
  this.route('previewpage-resident');
  this.route('previewpage-matching');
  this.route('previewpage-host');
  this.route('homepage-admin');
  this.route('matching-question');
  this.route('accountpage-caseworker');
  this.route('faqpage-caseworker');
  this.route('homepage-caseworker');
  this.route('resident-list');
});

export default Router;
