import Route from '@ember/routing/route';

export default Route.extend({
  redirect() {
    let profile = this.modelFor('auth.caseworker.resident');
    if (profile.isComplete) {
      // TODO: transition to profile page
    }
  }
});
