import { module, test } from 'qunit';
import { currentRouteName } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import loginUser from '../../../helpers/login-user';
import page from '../../../pages/caseworker/resident/about';

module('Acceptance | caseworker/resident/about', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  let mirageUser;
  let mirageResident;

  hooks.beforeEach(async function() {
    mirageUser = await loginUser('caseworker');
    mirageResident = mirageUser.createResident();
  });

  test('it renders empty', async function(assert) {
    await page.visit({ 'resident_profile_id': mirageResident.id });
    assert.equal(currentRouteName(), 'auth.caseworker.resident.about');
    assert.notOk(page.freeTime.value);
    assert.notOk(page.favoriteFood.value);
    assert.notOk(page.movieGenre.value);
    assert.notOk(page.funFact.value);
  });

  test('it renders populated', async function(assert) {
    mirageResident.update({
      freeTime: 'Clapping like a chicken',
      favoriteFood: 'Ice cream sandwiches',
      movieGenre: 'comedy',
      funFact: 'I am Gene Parmesan'
    });
    await page.visit({ 'resident_profile_id': mirageResident.id });

    assert.equal(currentRouteName(), 'auth.caseworker.resident.about');
    assert.equal(page.freeTime.value, 'Clapping like a chicken');
    assert.equal(page.favoriteFood.value, 'Ice cream sandwiches');
    assert.equal(page.movieGenre.value, 'Comedy');
    assert.equal(page.funFact.value, 'I am Gene Parmesan');
  });
});