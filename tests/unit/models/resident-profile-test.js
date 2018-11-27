import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Unit | Model | resident profile', function(hooks) {
  setupTest(hooks);
  setupMirage(hooks);

  let store;
  let mirageCaseworker;

  hooks.beforeEach(function() {
    store = this.owner.lookup('service:store');
    mirageCaseworker = this.server.create('caseworker', { givenName: 'Buster' });
  });

  test('it can create', async function(assert) {
    let caseworker = await store.findRecord('caseworker', mirageCaseworker.id);
    assert.equal(caseworker.hasMany('residents').ids().length, 0);

    let resident1 = store.createRecord('resident-profile', {
      caseworker,
      freeTime: 'doing fun stuff'
    });
    await resident1.save();

    let ids = caseworker.hasMany('residents').ids();
    assert.equal(ids.length, 1);
    assert.equal(ids[0], resident1.id);

    let { models: mirageResidents } = this.server.schema.residentProfiles.all();
    assert.equal(mirageResidents.length, 1);
    assert.equal(mirageResidents[0].caseworkerId, caseworker.id);
    assert.equal(mirageResidents[0].freeTime, 'doing fun stuff');

    let resident2 = store.createRecord('resident-profile', {
      caseworker,
      freeTime: 'doing boring stuff'
    });
    await resident2.save();

    ids = caseworker.hasMany('residents').ids();
    assert.equal(ids.length, 2);
    assert.equal(ids[0], resident1.id);
    assert.equal(ids[1], resident2.id);

    ({ models: mirageResidents } = this.server.schema.residentProfiles.all());
    assert.equal(mirageResidents.length, 2);
    assert.equal(mirageResidents[0].caseworkerId, caseworker.id);
    assert.equal(mirageResidents[0].freeTime, 'doing fun stuff');
    assert.equal(mirageResidents[1].caseworkerId, caseworker.id);
    assert.equal(mirageResidents[1].freeTime, 'doing boring stuff');
  });

  test('it can update', async function(assert) {
    mirageCaseworker.createResident({ freeTime: 'doing fun stuff' });
    let caseworker = await store.findRecord('caseworker', mirageCaseworker.id);
    let [ resident ] = (await caseworker.residents).toArray();

    resident.set('freeTime', 'doing boring stuff');
    await resident.save();

    let mirageResident = this.server.schema.residentProfiles.find(resident.id);
    assert.equal(mirageResident.freeTime, 'doing boring stuff');
  });

  test('it can delete', async function(assert) {
    mirageCaseworker.createResident({ freeTime: 'doing fun stuff' });
    let caseworker = await store.findRecord('caseworker', mirageCaseworker.id);
    let [ resident ] = (await caseworker.residents).toArray();

    await resident.destroyRecord();
    assert.equal(caseworker.hasMany('residents').ids().length, 0);
    assert.equal(this.server.schema.residentProfiles.all().length, 0);
  });
});
