import { module, test } from 'qunit';
import { currentRouteName } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import loginUser from '../../../helpers/login-user';
import page from '../../../pages/host/review2';

module('Acceptance | host/profile/review2', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  let mirageUser;

  hooks.beforeEach(async function() {
    mirageUser = await loginUser('host');
  });

  test('it renders', async function(assert) {
    mirageUser.createProfile();
    await page.visit();
    assert.equal(currentRouteName(), 'auth.host.review2');
    assert.deepEqual(page.sections.mapBy('editLink.isVisible'), [ true, true, false ]);
  });
});
