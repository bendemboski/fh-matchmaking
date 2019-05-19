import { module, test } from 'qunit';
import { currentRouteName } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import loginUser from '../../../helpers/login-user';
import page from '../../../pages/host/about';

module('Acceptance | host/profile/about', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  let mirageUser;

  hooks.beforeEach(async function() {
    mirageUser = await loginUser('host');
  });

  test('it renders empty', async function(assert) {
    await page.visit();
    assert.equal(currentRouteName(), 'auth.host.about');
    assert.notOk(page.freeTime.value);
    assert.notOk(page.favoriteFood.value);
    assert.notOk(page.movieGenre.value);
    assert.notOk(page.funFact.isVisible);
  });

  test('it renders populated', async function(assert) {
    mirageUser.createProfile({
      freeTime: 'Clapping like a chicken',
      favoriteFood: 'Ice cream sandwiches',
      movieGenre: 'comedy'
    });
    await page.visit();

    assert.equal(currentRouteName(), 'auth.host.about');
    assert.equal(page.freeTime.value, 'Clapping like a chicken');
    assert.equal(page.favoriteFood.value, 'Ice cream sandwiches');
    assert.equal(page.movieGenre.value, 'Comedy');
    assert.notOk(page.funFact.isVisible);
  });
});
