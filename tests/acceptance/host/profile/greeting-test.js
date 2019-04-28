import { module, test } from 'qunit';
import { currentRouteName } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import loginUser from '../../../helpers/login-user';
import page from '../../../pages/host/greeting';

const profilePicPlaceholder = '/assets/images/icon_photoPreview.png';

module('Acceptance | host/profile/greeting', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  let mirageUser;

  hooks.beforeEach(async function() {
    mirageUser = await loginUser('host');
  });

  test('it renders empty', async function(assert) {
    await page.visit();
    assert.equal(currentRouteName(), 'auth.host.greeting');
    assert.equal(page.profilePic.src, profilePicPlaceholder);
    assert.notOk(page.profileName.value);
    assert.notOk(page.greeting.value);
  });

  test('it renders populated', async function(assert) {
    mirageUser.createProfile({
      profilePic: 'http://s3.amazon.com/pic',
      profileName: 'The Bluth family',
      greeting: 'Hey Brother'
    });
    await page.visit();
    assert.equal(currentRouteName(), 'auth.host.greeting');
    assert.equal(page.profilePic.src, 'http://s3.amazon.com/pic');
    assert.equal(page.profileName.value, 'The Bluth family');
    assert.equal(page.greeting.value, 'Hey Brother');
  });
});
