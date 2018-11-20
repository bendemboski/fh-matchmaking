import { module, test } from 'qunit';
import { currentRouteName } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import loginUser from '../../../helpers/login-user';
import page from '../../../pages/caseworker/resident/bio';

module('Acceptance | caseworker/resident/bio', function(hooks) {
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
    assert.equal(currentRouteName(), 'auth.caseworker.resident.bio');
    assert.notOk(page.birthdate.month.value);
    assert.notOk(page.birthdate.day.value);
    assert.notOk(page.birthdate.year.value);
    assert.notOk(page.gender.value);
    assert.notOk(page.occupation.value);
    assert.notOk(page.languages.value);
    assert.notOk(page.adultCount.isVisible);
    assert.equal(page.kidCount.value, 0);
    assert.equal(page.petCount.value, 0);
    assert.notOk(page.petBreed.value);
  });

  test('it renders populated', async function(assert) {
    mirageResident.update({
      birthdate: new Date(1980, 2, 18).toISOString(),
      gender: 'male',
      occupation: 'Banana Stand Manager',
      languages: 'English, Klingon',
      kidCount: 1,
      petCount: 3,
      petBreed: 'Loose Seal'
    });
    await page.visit({ 'resident_profile_id': mirageResident.id });

    assert.equal(currentRouteName(), 'auth.caseworker.resident.bio');
    assert.equal(page.birthdate.month.value, '03 - Mar');
    assert.equal(page.birthdate.day.value, '18');
    assert.equal(page.birthdate.year.value, '1980');
    assert.equal(page.gender.value, 'Male');
    assert.equal(page.occupation.value, 'Banana Stand Manager');
    assert.equal(page.languages.value, 'English, Klingon');
    assert.notOk(page.adultCount.isVisible);
    assert.equal(page.kidCount.value, 1);
    assert.equal(page.petCount.value, 3);
    assert.equal(page.petBreed.value, 'Loose Seal');
  });
});
