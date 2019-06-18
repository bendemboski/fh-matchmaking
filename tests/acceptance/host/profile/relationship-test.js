import { module, test } from 'qunit';
import { currentRouteName } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import loginUser from '../../../helpers/login-user';
import page from '../../../pages/host/relationship';

module('Acceptance | host/profile/relationship', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  let mirageUser;

  hooks.beforeEach(async function() {
    mirageUser = await loginUser('host');
  });

  test('it renders empty', async function(assert) {
    await page.visit();
    assert.equal(currentRouteName(), 'auth.host.relationship');
    assert.equal(page.interactionLevel.value, 3);
  });

  test('it renders populated', async function(assert) {
    mirageUser.createProfile({
      interaction: 4
    });
    await page.visit();
    assert.equal(currentRouteName(), 'auth.host.relationship');
    assert.equal(page.interactionLevel.value, '4');
  });
});
