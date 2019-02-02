# fh-matchmaking

This README outlines the details of collaborating on this Ember application.
A short introduction of this app could easily go here.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/)
* [Yarn](https://yarnpkg.com/)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone git+ssh://git@github.com/bendemboski/fh-matchmaking` this repository
* `cd fh-matchmaking`
* `yarn`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

By default the app will run against the `dev` AWS environment. You can control
this using the `AWS_CONFIG` environment variable, e.g.

```
$ AWS_CONFIG=stage ember serve
```

See the `AWS Environments` section below for more info.

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `yarn lint:hbs`
* `yarn lint:js`
* `yarn lint:js -- --fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### AWS Environments

This app is set up to potentially run against three different environments in
AWS, a `dev` environment (for development purposes), a `stage` environment (for
staging/acceptance testing/etc), and a `prod` environment. From the standpoint
of this application, these environments comprise an API endpoint for talking to
the server running in Lambda, and some Cognito user pool information for
authentication/user management.

This is all managed in `config/environment.js`. By default, when the Ember
environment is set to `development` (the default for `ember serve`), it will
be configured to run against the `dev` AWS environment. When the Ember
environment is set to `production` (the default for
`ember build`/`ember deploy`), the app will be configured to run against the
`stage` AWS environment. Regardless, the configured AWS environment can be
overridden by setting the `AWS_CONFIG` environment variable to `dev`, `stage`,
or `prod`.

### Deploying

This app uses [ember-cli-deploy](http://ember-cli-deploy.com/)
to deploy to S3. It is set up to map the `ember-cli-deploy` deploy targets
(`development`, `staging`, and `production`) to the corresponding AWS
environments (`dev`, `stage`, and `prod`).

To deploy manually, you can run `yarn deploy <deployTarget>`, e.g.
`yarn deploy development`. This assumes you have an IAM user with the needed
credentials configured using the AWS SDK under the `fh` profile.

When a master build successfully completes in travis, it automatically deploys
the build to `staging` and activates it, and also deploys the build to
`production`, but does not activate it.

To activate production builds, you can run `yarn list-revisions production` and
`yarn activate --revision=<revision> production` scripts. This also requires an
`fh` IAM role configured.

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
