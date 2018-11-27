import { module, test } from 'qunit';
import { currentRouteName } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import loginUser from '../../../helpers/login-user';
import page from '../../../pages/caseworker/resident/location';

module('Acceptance | caseworker/resident/location', function(hooks) {
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
    assert.equal(currentRouteName(), 'auth.caseworker.resident.location');
    assert.notOk(page.neighborhood1.value);
    assert.notOk(page.neighborhood1.isDisabled);

    assert.notOk(page.neighborhood2.value);
    assert.ok(page.neighborhood2.isDisabled);

    assert.notOk(page.neighborhood3.value);
    assert.ok(page.neighborhood3.isDisabled);

    assert.notOk(page.link.isChecked);
    assert.notOk(page.busses.value);
    assert.notOk(page.environment.value);
  });

  test('it renders populated', async function(assert) {
    mirageResident.update({
      neighborhoods: [
        'belltown',
        'uDist',
        'mountBaker'
      ],
      link: true,
      busses: '41, 2',
      neighborhoodFeatures: 'Somewhere chill'
    });
    await page.visit({ 'resident_profile_id': mirageResident.id });

    assert.equal(currentRouteName(), 'auth.caseworker.resident.location');

    assert.equal(page.neighborhood1.value, 'Belltown');
    assert.notOk(page.neighborhood1.isDisabled);

    assert.equal(page.neighborhood2.value, 'U District');
    assert.notOk(page.neighborhood2.isDisabled);

    assert.equal(page.neighborhood3.value, 'Mount Baker');
    assert.notOk(page.neighborhood3.isDisabled);

    assert.equal(page.busses.value, '41, 2');
    assert.equal(page.environment.value, 'Somewhere chill');
  });

  test('it enables neighborhood selects and disables options as they are chosen', async function(assert) {
    await page.visit({ 'resident_profile_id': mirageResident.id });

    assert.notOk(page.neighborhood1.isDisabled);
    assert.ok(page.neighborhood2.isDisabled);
    assert.ok(page.neighborhood3.isDisabled);

    await page.neighborhood1.open();
    assert.equal(page.neighborhood1.items.filterBy('isDisabled').length, 0);

    // Choose first neighborhood
    await page.neighborhood1.choose('U District');
    assert.notOk(page.neighborhood1.isDisabled);
    assert.notOk(page.neighborhood2.isDisabled);
    assert.ok(page.neighborhood3.isDisabled);

    await page.neighborhood2.open();
    assert.deepEqual(page.neighborhood2.items.filterBy('isDisabled').mapBy('text').sort(), [
      'U District'
    ].sort());

    // Choose second neighborhood
    await page.neighborhood2.choose('Alki');
    assert.notOk(page.neighborhood1.isDisabled);
    assert.notOk(page.neighborhood2.isDisabled);
    assert.notOk(page.neighborhood3.isDisabled);

    await page.neighborhood1.open();
    assert.deepEqual(page.neighborhood1.items.filterBy('isDisabled').mapBy('text').sort(), [
      'Alki'
    ].sort());

    await page.neighborhood3.open();
    assert.deepEqual(page.neighborhood3.items.filterBy('isDisabled').mapBy('text').sort(), [
      'U District',
      'Alki'
    ].sort());

    // Choose third neighborhood
    await page.neighborhood3.choose('Mount Baker');
    assert.notOk(page.neighborhood1.isDisabled);
    assert.notOk(page.neighborhood2.isDisabled);
    assert.notOk(page.neighborhood3.isDisabled);

    await page.neighborhood1.open();
    assert.deepEqual(page.neighborhood1.items.filterBy('isDisabled').mapBy('text').sort(), [
      'Alki',
      'Mount Baker'
    ].sort());

    await page.neighborhood2.open();
    assert.deepEqual(page.neighborhood2.items.filterBy('isDisabled').mapBy('text').sort(), [
      'U District',
      'Mount Baker'
    ].sort());

    await page.neighborhood3.open();
    assert.deepEqual(page.neighborhood3.items.filterBy('isDisabled').mapBy('text').sort(), [
      'U District',
      'Alki',
    ].sort());

    // Change first neighborhood
    await page.neighborhood1.fillIn('South Park');

    await page.neighborhood1.open();
    assert.deepEqual(page.neighborhood1.items.filterBy('isDisabled').mapBy('text').sort(), [
      'Alki',
      'Mount Baker'
    ].sort());

    await page.neighborhood2.open();
    assert.deepEqual(page.neighborhood2.items.filterBy('isDisabled').mapBy('text').sort(), [
      'South Park',
      'Mount Baker'
    ].sort());

    await page.neighborhood3.open();
    assert.deepEqual(page.neighborhood3.items.filterBy('isDisabled').mapBy('text').sort(), [
      'South Park',
      'Alki',
    ].sort());
  });

  test('it can modify neighborhoods', async function(assert) {
    mirageResident.update({
      neighborhoods: [
        'belltown',
        'uDist',
        'mountBaker'
      ]
    });

    await page.visit({ 'resident_profile_id': mirageResident.id });

    await page.neighborhood2.fillIn('Alki');
    await page.footer.next();

    mirageResident.reload();
    assert.deepEqual(mirageResident.neighborhoods.sort(), [
      'belltown',
      'alki',
      'mountBaker'
    ].sort());
  });
});
