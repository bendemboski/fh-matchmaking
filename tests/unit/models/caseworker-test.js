import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Unit | Model | caseworker', function(hooks) {
  setupTest(hooks);
  setupMirage(hooks);

  let store;
  let caseworker1Id;
  let caseworker2Id;

  hooks.beforeEach(function() {
    store = this.owner.lookup('service:store');

    ({ id: caseworker1Id } = this.server.create('caseworker', { givenName: 'Buster' }));
    let caseworker = this.server.create('caseworker', { givenName: 'Lucille' });
    caseworker2Id = caseworker.id;
    caseworker.createResident();
    caseworker.createResident();
  });

  test('it can create', async function(assert) {
    let caseworker = store.createRecord('caseworker', { givenName: 'Gob' });
    await caseworker.save();
    assert.equal(caseworker.hasMany('residents').ids().length, 0);
    assert.equal(this.server.schema.caseworkers.find(caseworker.id).givenName, 'Gob');
  });

  test('it can list', async function(assert) {
    let caseworkers = await store.findAll('caseworker');
    assert.equal(caseworkers.length, 2);
    let [ caseworker1, caseworker2 ] = caseworkers.toArray();

    assert.equal(caseworker1.givenName, 'Buster');
    assert.equal(caseworker1.hasMany('residents').ids().length, 0);

    assert.equal(caseworker2.givenName, 'Lucille');
    let ids = caseworker2.hasMany('residents').ids();
    assert.equal(ids.length, 2);

    let resident1 = store.peekRecord('resident-profile', ids[0]);
    assert.ok(resident1);
    assert.equal(resident1.belongsTo('caseworker').id(), caseworker2.id);

    let resident2 = store.peekRecord('resident-profile', ids[1]);
    assert.ok(resident2);
    assert.equal(resident1.belongsTo('caseworker').id(), caseworker2.id);
  });

  test('it can get', async function(assert) {
    let caseworker1 = await store.findRecord('caseworker', caseworker1Id);
    assert.equal(caseworker1.givenName, 'Buster');
    assert.equal(caseworker1.hasMany('residents').ids().length, 0);

    let caseworker2 = await store.findRecord('caseworker', caseworker2Id);
    assert.equal(caseworker2.givenName, 'Lucille');
    let ids = caseworker2.hasMany('residents').ids();
    assert.equal(ids.length, 2);

    let resident1 = store.peekRecord('resident-profile', ids[0]);
    assert.ok(resident1);
    assert.equal(resident1.belongsTo('caseworker').id(), caseworker2.id);

    let resident2 = store.peekRecord('resident-profile', ids[1]);
    assert.ok(resident2);
    assert.equal(resident2.belongsTo('caseworker').id(), caseworker2.id);
  });

  test('it can update', async function(assert) {
    let caseworker1 = await store.findRecord('caseworker', caseworker1Id);
    caseworker1.set('givenName', 'Gob');
    await caseworker1.save();
    assert.equal(caseworker1.givenName, 'Gob');
    assert.equal(this.server.schema.caseworkers.find(caseworker1Id).givenName, 'Gob');
  });
});
