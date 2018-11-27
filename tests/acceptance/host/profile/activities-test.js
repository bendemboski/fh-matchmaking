import { module, test } from 'qunit';
import { currentRouteName } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import loginUser from '../../../helpers/login-user';
import page from '../../../pages/host/activities';

module('Acceptance | host/profile/activities', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  let mirageUser;

  hooks.beforeEach(async function() {
    mirageUser = await loginUser('host');
  });

  test('it renders empty', async function(assert) {
    await page.visit();
    assert.equal(currentRouteName(), 'auth.host.activities');
    assert.notOk(page.activities.value);
    assert.notOk(page.description.value);
  });

  test('it renders populated', async function(assert) {
    mirageUser.createProfile({
      backyardActivities: 'Drinking coffee',
      backyardDescription: 'Lots of grass!'
    });
    await page.visit();
    assert.equal(currentRouteName(), 'auth.host.activities');
    assert.equal(page.activities.value, 'Drinking coffee');
    assert.equal(page.description.value, 'Lots of grass!');
  });
});
