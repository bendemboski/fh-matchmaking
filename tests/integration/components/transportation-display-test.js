import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import page from '../../pages/components/transportation-display';

module('Integration | Component | transportation-display', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.set('profile', this.owner.lookup('service:store').createRecord('host-profile'));
  });

  test('it shows just link', async function(assert) {
    this.profile.set('link', true);
    await render(hbs`{{transportation-display profile=this.profile}}`);

    assert.equal(page.hasLink, true);
    assert.equal(page.hasBusses, false);
    assert.equal(page.hasNone, false);
  });

  test('it shows just busses', async function(assert) {
    this.profile.set('busses', '67, 45');
    await render(hbs`{{transportation-display profile=this.profile}}`);

    assert.equal(page.hasLink, false);
    assert.equal(page.hasBusses, true);
    assert.equal(page.busses, 'Busses: 67, 45');
    assert.equal(page.hasNone, false);
  });

  test('it shows link and busses', async function(assert) {
    this.profile.setProperties({
      link: true,
      busses: '67, 45'
    });
    await render(hbs`{{transportation-display profile=this.profile}}`);

    assert.equal(page.hasLink, true);
    assert.equal(page.hasBusses, true);
    assert.equal(page.busses, 'Busses: 67, 45');
    assert.equal(page.hasNone, false);
  });

  test('it shows nothing', async function(assert) {
    await render(hbs`{{transportation-display profile=this.profile}}`);

    assert.equal(page.hasLink, false);
    assert.equal(page.hasBusses, false);
    assert.equal(page.hasNone, true);
  });
});
