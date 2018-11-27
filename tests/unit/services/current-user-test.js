import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import loginUser from '../../helpers/login-user';

module('Unit | Service | current-user', function(hooks) {
  setupTest(hooks);
  setupMirage(hooks);

  let service;

  hooks.beforeEach(async function() {
    service = this.owner.lookup('service:current-user');
  });

  module('load', function() {
    test('admin', async function(assert) {
      await loginUser('admin', { givenName: 'Buster' });
      await service.load.perform();

      assert.equal(service.type, 'admin');
      assert.equal(service.model.givenName, 'Buster');
      assert.ok(service.isAdmin);
      assert.notOk(service.isHost);
      assert.notOk(service.isCaseworker);
    });

    test('host', async function(assert) {
      await loginUser('host', { givenName: 'Buster' });
      await service.load.perform();

      assert.equal(service.type, 'host');
      assert.equal(service.model.givenName, 'Buster');
      assert.notOk(service.isAdmin);
      assert.ok(service.isHost);
      assert.notOk(service.isCaseworker);
    });

    test('caseworker', async function(assert) {
      await loginUser('caseworker', { givenName: 'Buster' });
      await service.load.perform();

      assert.equal(service.type, 'caseworker');
      assert.equal(service.model.givenName, 'Buster');
      assert.notOk(service.isAdmin);
      assert.notOk(service.isHost);
      assert.ok(service.isCaseworker);
    });
  });
});
