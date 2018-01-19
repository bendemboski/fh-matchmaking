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
  this.route('faq_page');
  this.route('residentprofile1-1');
  this.route('thankyou_page');
  this.route('residentprofile1-2');
  this.route('residentprofile1-3');
  this.route('residentprofile1-4');
  this.route('residentprofile2-1');
  this.route('residentprofile3-1');
  this.route('residentprofile3-2');
  this.route('previewpage_resident');
  this.route('thankyoupage-host');
  this.route('thankyoupage-resident');
  this.route('signin-page');
  this.route('accountpage-host');
  this.route('accountpage-resident');
  this.route('resident-list');
  this.route('faqpage-host');
});

export default Router;
