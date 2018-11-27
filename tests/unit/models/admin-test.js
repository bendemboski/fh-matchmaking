import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Unit | Model | host', function(hooks) {
  setupTest(hooks);
  setupMirage(hooks);

  let store;
  let admin1Id;
  let admin2Id;

  hooks.beforeEach(function() {
    store = this.owner.lookup('service:store');

    ({ id: admin1Id } = this.server.create('admin', { givenName: 'Buster' }));
    ({ id: admin2Id } = this.server.create('admin', { givenName: 'Lucille' }));
  });

  test('it can create', async function(assert) {
    let admin = store.createRecord('admin', { givenName: 'Gob' });
    await admin.save();
    assert.equal(this.server.schema.admins.find(admin.id).givenName, 'Gob');
  });

  test('it can list', async function(assert) {
    let admins = await store.findAll('admin');
    assert.equal(admins.length, 2);
    let [ admin1, admin2 ] = admins.toArray();
    assert.equal(admin1.givenName, 'Buster');
    assert.equal(admin2.givenName, 'Lucille');
  });

  test('it can get', async function(assert) {
    let admin1 = await store.findRecord('admin', admin1Id);
    assert.equal(admin1.givenName, 'Buster');

    let admin2 = await store.findRecord('admin', admin2Id);
    assert.equal(admin2.givenName, 'Lucille');
  });

  test('it can update', async function(assert) {
    let admin1 = await store.findRecord('admin', admin1Id);
    admin1.set('givenName', 'Gob');
    await admin1.save();
    assert.equal(admin1.givenName, 'Gob');
    assert.equal(this.server.schema.admins.find(admin1Id).givenName, 'Gob');
  });
});
