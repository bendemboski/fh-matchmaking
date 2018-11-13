import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import loginUser from '../helpers/login-user';

module('Acceptance | index', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('it redirects to the login page when not signed in', async function(assert) {
    await visit('/');
    assert.equal(currentURL(), '/login');
  });

  test('it redirects admins', async function(assert) {
    await loginUser('admin');
    await visit('/');
    assert.equal(currentURL(), '/admin');
  });

  test('it redirects hosts', async function(assert) {
    await loginUser('host');
    await visit('/');
    assert.equal(currentURL(), '/host');
  });

  test('it redirects caseworkers', async function(assert) {
    await loginUser('caseworker');
    await visit('/');
    assert.equal(currentURL(), '/caseworker');
  });
});
