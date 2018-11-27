import { module, test } from 'qunit';
import { currentRouteName } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import loginUser from '../../../helpers/login-user';
import page from '../../../pages/host/substances';

module('Acceptance | host/profile/substances', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  let mirageUser;

  hooks.beforeEach(async function() {
    mirageUser = await loginUser('host');
  });

  test('it renders empty', async function(assert) {
    await page.visit();
    assert.equal(currentRouteName(), 'auth.host.substances');
    assert.deepEqual(page.mySubstances.substances.filterBy('isChecked').mapBy('name'), []);
    assert.deepEqual(page.residentSubstances.substances.filterBy('isChecked').mapBy('name'), []);
  });

  test('it renders populated', async function(assert) {
    mirageUser.createProfile({
      mySubstances: [ 'alcohol' ],
      residentSubstances: [ 'marijuana', 'tobacco' ]
    });
    await page.visit();
    assert.equal(currentRouteName(), 'auth.host.substances');
    assert.deepEqual(page.mySubstances.substances.filterBy('isChecked').mapBy('name').sort(), [
      'Alcohol'
    ].sort());
    assert.deepEqual(page.residentSubstances.substances.filterBy('isChecked').mapBy('name').sort(), [
      'Marijuana', 'Tobacco'
    ].sort());
  });
});
