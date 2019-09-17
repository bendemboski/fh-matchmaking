import { module, test } from 'qunit';
import { currentRouteName } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import loginUser from '../../../helpers/login-user';
import page from '../../../pages/host/location';

module('Acceptance | host/profile/location', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  let mirageUser;

  hooks.beforeEach(async function() {
    mirageUser = await loginUser('host');
  });

  test('it renders empty', async function(assert) {
    await page.visit();
    assert.equal(currentRouteName(), 'auth.host.location');
    assert.notOk(page.neighborhood.value);
    assert.notOk(page.address.value);
    assert.notOk(page.lightRailStation.value);
    assert.notOk(page.busses.value);
    assert.notOk(page.environment.value);
  });

  test('it renders populated', async function(assert) {
    mirageUser.createProfile({
      neighborhood: 'belltown',
      address: '205 Vine',
      lightRailStation: 'pioneerSquare',
      busses: '41, 2',
      neighborhoodFeatures: 'Edge of downtown'
    });
    await page.visit();
    assert.equal(currentRouteName(), 'auth.host.location');
    assert.equal(page.neighborhood.value, 'Belltown');
    assert.equal(page.address.value, '205 Vine');
    assert.equal(page.lightRailStation.value, 'Pioneer Square');
    assert.equal(page.busses.value, '41, 2');
    assert.equal(page.environment.value, 'Edge of downtown');
  });
});
