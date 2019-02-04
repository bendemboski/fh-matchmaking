import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import ImageProp from 'fh-matchmaking/utils/image-prop';
import imageBlob, {
  width as imageBlobWidth,
  height as imageBlobHeight
} from '../../helpers/image-blob';
import sinon from 'sinon';

module('Unit | Utility | image prop', function(hooks) {
  setupTest(hooks);
  setupMirage(hooks);

  async function getImageSize(src) {
    return await new Promise((resolve, reject) => {
      let img = new Image();
      img.onload = () => {
        let { width, height } = img;
        resolve({ width, height });
      };
      img.onerror = reject;
      img.src = src;
    });
  }

  test('it can display a remote URL', function(assert) {
    let prop = ImageProp.create({ remoteUrl: 'http://images.com/image.jpg' });
    assert.equal(prop.url, 'http://images.com/image.jpg');
  });

  test('it can display a local blob', async function(assert) {
    let prop = ImageProp.create({ blob: imageBlob });
    assert.ok(prop.url);

    let { width, height } = await getImageSize(prop.url);
    assert.equal(width, imageBlobWidth);
    assert.equal(height, imageBlobHeight);
  });

  test('it can set a local blob', async function(assert) {
    let prop = ImageProp.create();
    assert.notOk(prop.url);

    prop.set('blob', imageBlob);
    let { width, height } = await getImageSize(prop.url);
    assert.equal(width, imageBlobWidth);
    assert.equal(height, imageBlobHeight);
  });

  test('it can replace a remote url', async function(assert) {
    let prop = ImageProp.create({ remoteUrl: 'http://images.com/image.jpg' });
    assert.equal(prop.url, 'http://images.com/image.jpg');

    prop.set('blob', imageBlob);
    let { width, height } = await getImageSize(prop.url);
    assert.equal(width, imageBlobWidth);
    assert.equal(height, imageBlobHeight);
  });

  test('it can replace a local blob', async function(assert) {
    let prop = ImageProp.create({ blob: new Blob(['text blob'], { type: 'text/plain' }) });
    assert.ok(prop.url);

    prop.set('blob', imageBlob);
    assert.ok(prop.url);

    let { width, height } = await getImageSize(prop.url);
    assert.equal(width, imageBlobWidth);
    assert.equal(height, imageBlobHeight);
  });

  test('it can upload a blob', async function(assert) {
    let uploadStub = sinon.stub();
    this.server.put('http://s3.amazon.com/upload', uploadStub);


    let prop = ImageProp.create({ blob: imageBlob });

    let url = await prop.uploadBlob(this.owner.lookup('service:ajax'));
    assert.equal(url, 'http://s3.amazon.com/download');
    assert.equal(prop.url, url);

    assert.ok(uploadStub.called);
  });
});
