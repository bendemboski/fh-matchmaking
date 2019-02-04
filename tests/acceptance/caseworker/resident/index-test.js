import { module, test } from 'qunit';
import { currentRouteName } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import loginUser from '../../../helpers/login-user';
import page from '../../../pages/caseworker/resident/index';

const profilePicPlaceholder = '/assets/images/icon_photoPreview.png';

module('Acceptance | caseworker/resident/index', function(hooks) {
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
    assert.equal(currentRouteName(), 'auth.caseworker.resident.index');
    assert.equal(page.profilePic.src, profilePicPlaceholder);
    assert.notOk(page.firstName.value);
    assert.notOk(page.lastName.value);
    assert.notOk(page.email.value);
    assert.notOk(page.phoneNumber.value);
  });

  test('it renders populated', async function(assert) {
    mirageResident.update({
      profilePic: 'http://s3.amazon.com/pic',
      firstName: 'Buster',
      lastName: 'Bluth',
      email: 'buster@bluth.com',
      phoneNumber: '5155558682'
    });
    await page.visit({ 'resident_profile_id': mirageResident.id });

    assert.equal(currentRouteName(), 'auth.caseworker.resident.index');
    assert.equal(page.profilePic.src, 'http://s3.amazon.com/pic');
    assert.equal(page.firstName.value, 'Buster');
    assert.equal(page.lastName.value, 'Bluth');
    assert.equal(page.email.value, 'buster@bluth.com');
    assert.equal(page.phoneNumber.value, '5155558682');
  });
});
