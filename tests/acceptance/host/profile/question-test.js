import { module, test } from 'qunit';
import { currentRouteName } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import loginUser from '../../../helpers/login-user';
import page from '../../../pages/host/question';

module('Acceptance | host/profile/question', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  let mirageUser;

  hooks.beforeEach(async function() {
    mirageUser = await loginUser('host');
  });

  test('it renders empty', async function(assert) {
    await page.visit();
    assert.equal(currentRouteName(), 'auth.host.question');
    assert.notOk(page.question.value);
  });

  test('it renders populated', async function(assert) {
    mirageUser.createProfile({ question: 'What is your favorite color?' });
    await page.visit();
    assert.equal(currentRouteName(), 'auth.host.question');
    assert.equal(page.question.value, 'What is your favorite color?');
  });
});
