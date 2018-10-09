import Component from '@ember/component';

export default Component.extend({
  classNames: [ 'profile-page-column', 'col-md-12', 'col-sm-12', 'col-12' ],
  classNameBindings: [ 'right:col-lg-5:col-lg-7' ]
});
