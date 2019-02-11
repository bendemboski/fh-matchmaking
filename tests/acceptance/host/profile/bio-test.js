import { module, test } from 'qunit';
import { currentRouteName } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import loginUser from '../../../helpers/login-user';
import page from '../../../pages/host/bio';

module('Acceptance | host/profile/bio', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  let mirageUser;

  hooks.beforeEach(async function() {
    mirageUser = await loginUser('host');
  });

  test('it renders empty', async function(assert) {
    await page.visit();
    assert.equal(currentRouteName(), 'auth.host.bio');
    assert.notOk(page.birthdate.month.value);
    assert.notOk(page.birthdate.day.value);
    assert.notOk(page.birthdate.year.value);
    assert.notOk(page.gender.value);
    assert.notOk(page.occupation.value);
    assert.notOk(page.languages.value);
    assert.equal(page.adultCount.value, 1);
    assert.equal(page.kidCount.value, 0);
    assert.equal(page.petCount.value, 0);
    assert.notOk(page.petBreed.isVisible);
  });

  test('it renders populated', async function(assert) {
    mirageUser.createProfile({
      birthdate: new Date(1980, 2, 18).toISOString(),
      gender: 'male',
      occupation: 'Banana Stand Manager',
      languages: 'English, Klingon',
      adultCount: 2,
      kidCount: 1,
      petCount: 3
    });
    await page.visit();

    assert.equal(currentRouteName(), 'auth.host.bio');
    assert.equal(page.birthdate.month.value, '03 - Mar');
    assert.equal(page.birthdate.day.value, '18');
    assert.equal(page.birthdate.year.value, '1980');
    assert.equal(page.gender.value, 'Male');
    assert.equal(page.occupation.value, 'Banana Stand Manager');
    assert.equal(page.languages.value, 'English, Klingon');
    assert.equal(page.adultCount.value, 2);
    assert.equal(page.kidCount.value, 1);
    assert.equal(page.petCount.value, 3);
    assert.notOk(page.petBreed.isVisible);
  });
});