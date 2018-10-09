import Route from '@ember/routing/route';

export default Route.extend({
  redirect() {
    let profile = this.modelFor('auth.host');
    if (profile.isComplete) {
      // TODO: transition to profile page
    }
  }
});
