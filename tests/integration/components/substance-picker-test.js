import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import picker from '../../pages/components/substance-picker';

module('Integration | Component | substance-picker', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.set('substances', []);
  });

  async function renderPicker() {
    await render(hbs`
      {{substance-picker
        substances=this.substances
        onchange=(action (mut this.substances))
      }}
    `);
  }

  function getChecked() {
    let checked = picker.substances.filter(({ isChecked }) => isChecked);
    return checked.map(({ name }) => name);
  }

  test('it renders with nothing selected', async function(assert) {
    await renderPicker();
    assert.deepEqual(getChecked(), [ 'None' ]);
  });

  test('it renders with selections', async function(assert) {
    this.set('substances', [ 'alcohol', 'tobacco' ]);
    await renderPicker();
    assert.deepEqual(getChecked(), [ 'Alcohol', 'Tobacco' ]);
  });

  test('clicking none with nothing selected is a no-op', async function(assert) {
    await renderPicker();
    let none = [ ...picker.substances ].find(({ name }) => name === 'None');

    await none.toggle();
    assert.deepEqual(getChecked(), [ 'None' ]);
  });

  test('clicking none with selections clears them', async function(assert) {
    this.set('substances', [ 'alcohol', 'tobacco' ]);
    await renderPicker();

    assert.deepEqual(getChecked(), [ 'Alcohol', 'Tobacco' ]);

    let none = [ ...picker.substances ].find(({ name }) => name === 'None');
    await none.toggle();
    assert.deepEqual(getChecked(), [ 'None' ]);
  });

  test('selecting something clears none', async function(assert) {
    await renderPicker();

    assert.deepEqual(getChecked(), [ 'None' ]);

    let alcohol = [ ...picker.substances ].find(({ name }) => name === 'Alcohol');
    await alcohol.toggle();
    assert.deepEqual(getChecked(), [ 'Alcohol' ]);
  });
});
