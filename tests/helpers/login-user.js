import { getContext } from '@ember/test-helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';
import { mockCognitoUser } from 'ember-cognito/test-support';

export default async function loginUser(type, userAttributes) {
  let mirageUser = getContext().server.create(type, userAttributes);

  await authenticateSession();
  await mockCognitoUser({
    user: { username: mirageUser.id },
    groups: [ `${type}s` ],
  });
  return mirageUser;
}
