import { module, test } from 'qunit';
import { currentRouteName } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import loginUser from '../../../helpers/login-user';
import page from '../../../pages/host/photos';

const photoPlaceholder = '/assets/images/icon_imageUpload.png';

module('Acceptance | host/profile/photos', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  let mirageUser;

  hooks.beforeEach(async function() {
    mirageUser = await loginUser('host');
  });

  test('it renders empty', async function(assert) {
    await page.visit();
    assert.equal(currentRouteName(), 'auth.host.photos');
    assert.equal(page.photos.objectAt(0).src, photoPlaceholder);
    assert.equal(page.photos.objectAt(1).src, photoPlaceholder);
    assert.equal(page.photos.objectAt(2).src, photoPlaceholder);
    assert.equal(page.photos.objectAt(3).src, photoPlaceholder);
  });

  test('it renders populated', async function(assert) {
    mirageUser.createProfile({
      photo1: 'http://s3.amazon.com/photo1',
      photo2: 'http://s3.amazon.com/photo2',
      photo3: 'http://s3.amazon.com/photo3',
      photo4: 'http://s3.amazon.com/photo4',
    });
    await page.visit();
    assert.equal(currentRouteName(), 'auth.host.photos');
    assert.equal(page.photos.objectAt(0).src, 'http://s3.amazon.com/photo1');
    assert.equal(page.photos.objectAt(1).src, 'http://s3.amazon.com/photo2');
    assert.equal(page.photos.objectAt(2).src, 'http://s3.amazon.com/photo3');
    assert.equal(page.photos.objectAt(3).src, 'http://s3.amazon.com/photo4');
  });
});
