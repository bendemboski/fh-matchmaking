import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Unit | Model | host profile', function(hooks) {
  setupTest(hooks);
  setupMirage(hooks);

  let store;
  let mirageHost;

  hooks.beforeEach(function() {
    store = this.owner.lookup('service:store');
    mirageHost = this.server.create('host', { givenName: 'Buster' });
  });

  test('it can create', async function(assert) {
    let host = await store.findRecord('host', mirageHost.id);
    assert.notOk(host.belongsTo('profile').id());

    let profile = store.createRecord('host-profile', {
      host,
      freeTime: 'doing fun stuff'
    });
    await profile.save();

    let profileId = host.belongsTo('profile').id();
    assert.ok(profileId);
    assert.equal(profileId, profile.id);

    let mirageProfile = this.server.schema.hostProfiles.find(profileId);
    assert.ok(mirageProfile);
    assert.equal(mirageProfile.hostId, mirageHost.id);
    assert.equal(mirageProfile.freeTime, 'doing fun stuff');
  });

  test('it can update', async function(assert) {
    mirageHost.createProfile({ freeTime: 'doing fun stuff' });
    let host = await store.findRecord('host', mirageHost.id);
    let profile = await host.profile;

    profile.set('freeTime', 'doing boring stuff');
    await profile.save();

    let mirageProfile = this.server.schema.hostProfiles.find(profile.id);
    assert.equal(mirageProfile.freeTime, 'doing boring stuff');
  });

  test('it can delete', async function(assert) {
    mirageHost.createProfile({ freeTime: 'doing fun stuff' });
    let host = await store.findRecord('host', mirageHost.id);
    let profile = await host.profile;

    await profile.destroyRecord();
    assert.notOk(host.belongsTo('profile').id());
    assert.equal(this.server.schema.hostProfiles.all().length, 0);
  });
});
