'use strict';

const awsConfigs = {
  dev: {
    api: {
      host: 'https://0gdb6u1f1m.execute-api.us-west-2.amazonaws.com',
      namespace: 'dev'
    },
    cognito: {
      poolId: 'us-west-2_ySNN3uOb9',
      clientId: '7sceo078sm4a3jebp6cra3d6hs',
      autoRefreshSession: true
    }
  },
  stage: {
    api: {
      host: 'https://htvq3k5hl5.execute-api.us-west-2.amazonaws.com',
      namespace: 'stage'
    },
    cognito: {
      poolId: 'us-west-2_6jA15quMY',
      clientId: '1r3hhfja6nemosiv7p4uik9djc',
      autoRefreshSession: true
    }
  },
  prod: {
    api: {
      host: 'https://ekeu21ypxh.execute-api.us-west-2.amazonaws.com',
      namespace: 'prod'
    },
    cognito: {
      poolId: 'us-west-2_LRHMlIol4',
      clientId: '78s0sk4r5iorq2lqcj77vanlrg',
      autoRefreshSession: true
    }
  },
  test: {
    api: {
      host: '',
      namespace: ''
    },
    cognito: {
      poolId: '',
      clientId: ''
    }
  }
}

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'fh-matchmaking',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    'ember-cli-notifications': {
      autoClear: true,
      clearDuration: 5000
    },

    'ember-cli-mirage': {
      enabled: false
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    Object.assign(ENV, awsConfigs.dev);
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
    Object.assign(ENV, awsConfigs.test);
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
    Object.assign(ENV, awsConfigs.stage);
  }

  // The default config for the build environment will have been assigned
  // above, so now see if the environment is overriding it.
  let { AWS_CONFIG: awsConfigName } = process.env;
  if (awsConfigName) {
    if (!awsConfigs[awsConfigName]) {
      throw new Error(`Unknown AWS_CONFIG: ${awsConfigName}`);
    }

    Object.assign(ENV, awsConfigs[awsConfigName]);
  }

  // And finally, if the LOCAL_API environment variable is set, point to a
  // local server
  if (process.env.LOCAL_API) {
    ENV.api = { host: 'http://localhost:3100' };
  }

  return ENV;
};
