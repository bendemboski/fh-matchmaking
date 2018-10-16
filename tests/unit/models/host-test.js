import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Unit | Model | host', function(hooks) {
  setupTest(hooks);
  setupMirage(hooks);

  let store;
  let host1Id;
  let host2Id;

  hooks.beforeEach(function() {
    store = this.owner.lookup('service:store');

    ({ id: host1Id } = this.server.create('host', { givenName: 'Buster' }));
    let host = this.server.create('host', { givenName: 'Lucille' });
    host2Id = host.id;
    host.createProfile();
  });

  test('it can create', async function(assert) {
    let host = store.createRecord('host', { givenName: 'Gob' });
    await host.save();
    assert.notOk(host.belongsTo('profile').id());
    assert.equal(this.server.schema.hosts.find(host.id).givenName, 'Gob');
  });

  test('it can list', async function(assert) {
    let hosts = await store.findAll('host');
    assert.equal(hosts.length, 2);
    let [ host1, host2 ] = hosts.toArray();

    assert.equal(host1.givenName, 'Buster');
    assert.notOk(host1.belongsTo('profile').id());

    assert.equal(host2.givenName, 'Lucille');
    assert.ok(host2.belongsTo('profile').id());
    let profile = store.peekRecord('host-profile', host2.belongsTo('profile').id());
    assert.ok(profile);
    assert.equal(profile.belongsTo('host').id(), host2.id);
  });

  test('it can get', async function(assert) {
    let host1 = await store.findRecord('host', host1Id);
    assert.equal(host1.givenName, 'Buster');
    assert.notOk(host1.belongsTo('profile').id());

    let host2 = await store.findRecord('host', host2Id);
    assert.equal(host2.givenName, 'Lucille');
    assert.ok(host2.belongsTo('profile').id());
    let profile = store.peekRecord('host-profile', host2.belongsTo('profile').id());
    assert.ok(profile);
    assert.equal(profile.belongsTo('host').id(), host2.id);
  });

  test('it can update', async function(assert) {
    let host1 = await store.findRecord('host', host1Id);
    host1.set('givenName', 'Gob');
    await host1.save();
    assert.equal(host1.givenName, 'Gob');
    assert.equal(this.server.schema.hosts.find(host1Id).givenName, 'Gob');
  });
});
