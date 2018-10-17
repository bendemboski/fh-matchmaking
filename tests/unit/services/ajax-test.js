import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Unit | Service | ajax', function(hooks) {
  setupTest(hooks);
  setupMirage(hooks);

  test('it includes the access token in requests', async function(assert) {
    let headers;
    this.server.get('/endpoint', (schema, { requestHeaders }) => {
      headers = requestHeaders;
      return {};
    });

    await authenticateSession({ 'access_token': '12345abcde' });

    let service = this.owner.lookup('service:ajax');
    await service.request('/endpoint', { method: 'GET' });
    assert.equal(headers.Authorization, 'Bearer 12345abcde');
  });
});
