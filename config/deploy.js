const configs = {
  development: {
    s3Bucket: 'matchmaking-dev.the-block-project.org',
    awsConfig: 'dev'
  },
  staging: {
    s3Bucket: 'matchmaking-stage.the-block-project.org',
    awsConfig: 'stage'
  },
  production: {
    s3Bucket: 'matchmaking.the-block-project.org',
    awsConfig: 'prod'
  },
};

module.exports = function(deployTarget) {
  var ENV = {
    build: {
      environment: 'production'
    },
    s3: {
      region: 'us-west-2',
    },
    's3-index': {},
    'revision-data': {
      'type': 'version-commit'
    },
  };

  ENV.s3.bucket = configs[deployTarget].s3Bucket;

  ENV['s3-index'].region = ENV.s3.region;
  ENV['s3-index'].bucket = ENV.s3.bucket;  

  // Set the AWS config so `config/environment.js` will configure the correct
  // API endpoint, etc.
  process.env.AWS_CONFIG = configs[deployTarget].awsConfig;

  return ENV;
};
