import { module, test } from 'qunit';
import { currentRouteName } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import loginUser from '../../../helpers/login-user';
import page from '../../../pages/caseworker/resident/substances';

module('Acceptance | caseworker/resident/substances', function(hooks) {
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
    assert.equal(currentRouteName(), 'auth.caseworker.resident.substances');
    assert.deepEqual(page.mySubstances.substances.filterBy('isChecked').mapBy('name'), []);
    assert.deepEqual(page.hostSubstances.substances.filterBy('isChecked').mapBy('name'), []);
  });

  test('it renders populated', async function(assert) {
    mirageResident.update({
      mySubstances: [ 'alcohol' ],
      hostSubstances: [ 'marijuana', 'tobacco' ]
    });
    await page.visit({ 'resident_profile_id': mirageResident.id });

    assert.equal(currentRouteName(), 'auth.caseworker.resident.substances');
    assert.deepEqual(page.mySubstances.substances.filterBy('isChecked').mapBy('name').sort(), [
      'Alcohol'
    ].sort());
    assert.deepEqual(page.hostSubstances.substances.filterBy('isChecked').mapBy('name').sort(), [
      'Marijuana', 'Tobacco'
    ].sort());
  });
});
