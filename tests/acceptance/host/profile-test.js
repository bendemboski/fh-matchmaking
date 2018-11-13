import { module, test } from 'qunit';
import { visit, currentRouteName, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import loginUser from '../../helpers/login-user';
import moment from 'moment';
import greetingPage from '../../pages/host/greeting';
import bioPage from '../../pages/host/bio';
import aboutPage from '../../pages/host/about';
import substancesPage from '../../pages/host/substances';
import review1Page from '../../pages/host/review1';
import locationPage from '../../pages/host/location';
import activitiesPage from '../../pages/host/activities';
import photosPage from '../../pages/host/photos';
import review2Page from '../../pages/host/review2';
import relationshipPage from '../../pages/host/relationship';
import questionPage from '../../pages/host/question';
import review3Page from '../../pages/host/review2';
import profilePage from '../../pages/host/profile';

module('Acceptance | host/profile', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  let mirageUser;

  hooks.beforeEach(async function() {
    mirageUser = await loginUser('host', {
      givenName: 'Buster',
      familyName: 'Bluth',
      birthdate: moment().subtract(32, 'years').toISOString()
    });
  });

  test('build profile', async function(assert) {
    await visit('/host');
    await click('[data-test-build-profile]');

    // Greeting
    assert.equal(currentRouteName(), 'auth.host.greeting');
    // TODO: picture
    await greetingPage.greeting.fillIn('Hey brother!');
    await greetingPage.footer.next();

    mirageUser.reload();
    assert.equal(mirageUser.profile.greeting, 'Hey brother!');

    // Bio
    assert.equal(currentRouteName(), 'auth.host.bio');
    await bioPage.birthdate.fillIn(3, 18, 1980);
    await bioPage.gender.fillIn('Male');
    await bioPage.occupation.fillIn('Banana Stand Manager');
    await bioPage.languages.fillIn('English, Klingon');
    await bioPage.adultCount.increment();
    await bioPage.kidCount.increment();
    await bioPage.petCount.increment();
    await bioPage.petCount.increment();
    await bioPage.petCount.increment();
    await bioPage.footer.next();

    mirageUser.reload();
    assert.equal(mirageUser.profile.birthdate, new Date(1980, 2, 18).toISOString());
    assert.equal(mirageUser.profile.gender, 'male');
    assert.equal(mirageUser.profile.occupation, 'Banana Stand Manager');
    assert.equal(mirageUser.profile.languages, 'English, Klingon');
    assert.equal(mirageUser.profile.adultCount, 2);
    assert.equal(mirageUser.profile.kidCount, 1);
    assert.equal(mirageUser.profile.petCount, 3);

    // About
    assert.equal(currentRouteName(), 'auth.host.about');
    await aboutPage.freeTime.fillIn('Clapping like a chicken');
    await aboutPage.favoriteFood.fillIn('Ice cream sandwiches');
    await aboutPage.movieGenre.fillIn('Comedy');
    await aboutPage.footer.next();

    mirageUser.reload();
    assert.equal(mirageUser.profile.freeTime, 'Clapping like a chicken');
    assert.equal(mirageUser.profile.favoriteFood, 'Ice cream sandwiches');
    assert.equal(mirageUser.profile.movieGenre, 'comedy');

    // Substances
    assert.equal(currentRouteName(), 'auth.host.substances');
    await substancesPage.mySubstances.chooseSubstances([ 'Alcohol' ]);
    await substancesPage.residentSubstances.chooseSubstances([ 'Marijuana', 'Tobacco' ]);
    await substancesPage.footer.next();

    mirageUser.reload();
    assert.deepEqual(mirageUser.profile.mySubstances.sort(), [ 'alcohol' ].sort());
    assert.deepEqual(mirageUser.profile.residentSubstances.sort(), [ 'marijuana', 'tobacco' ].sort());

    // Review1
    assert.equal(currentRouteName(), 'auth.host.review1');
    await review1Page.footer.next();

    // Location
    assert.equal(currentRouteName(), 'auth.host.location');
    await locationPage.neighborhood.fillIn('U District');
    await locationPage.address.fillIn('5404 12th Ave NE');
    await locationPage.link.fillIn(true);
    await locationPage.environment.fillIn('Urban village');
    await locationPage.footer.next();

    mirageUser.reload();
    assert.equal(mirageUser.profile.neighborhood, 'uDist');
    assert.equal(mirageUser.profile.address, '5404 12th Ave NE');
    assert.ok(mirageUser.profile.link);
    assert.equal(mirageUser.profile.neighborhoodFeatures, 'Urban village');

    // Activities
    assert.equal(currentRouteName(), 'auth.host.activities');
    await activitiesPage.activities.fillIn('Rainbathing');
    await activitiesPage.description.fillIn('A small but comfy space');
    await activitiesPage.footer.next();

    mirageUser.reload();
    assert.equal(mirageUser.profile.backyardActivities, 'Rainbathing');
    assert.equal(mirageUser.profile.backyardDescription, 'A small but comfy space');

    // Photos
    assert.equal(currentRouteName(), 'auth.host.photos');
    // TODO: photos!
    await photosPage.footer.next();

    mirageUser.reload();

    // Review2
    assert.equal(currentRouteName(), 'auth.host.review2');
    await review2Page.footer.next();

    // Relationship
    assert.equal(currentRouteName(), 'auth.host.relationship');
    await relationshipPage.relationship.fillIn('Neighborly friends or friendly neighbors');
    await relationshipPage.interactionLevel.fillIn('1');
    await relationshipPage.footer.next();

    mirageUser.reload();
    assert.equal(mirageUser.profile.relationship, 'Neighborly friends or friendly neighbors');
    assert.equal(mirageUser.profile.interaction, 1);

    // Question
    assert.equal(currentRouteName(), 'auth.host.question');
    await questionPage.question.fillIn('But where did the lighter fluid come from?');
    await questionPage.footer.next();

    mirageUser.reload();
    assert.equal(mirageUser.profile.question, 'But where did the lighter fluid come from?');

    // Review2
    assert.equal(currentRouteName(), 'auth.host.review3');
    await review3Page.footer.next();

    // Profile
    assert.equal(currentRouteName(), 'auth.host.profile');
    assert.equal(profilePage.name, 'Buster Bluth');
    assert.equal(profilePage.gender, 'Male');
    assert.equal(profilePage.age, '32');
    assert.equal(profilePage.occupation, 'Banana Stand Manager');
    assert.equal(profilePage.neighborhood, 'U District');
    assert.equal(profilePage.adultCount, 2);
    assert.equal(profilePage.kidCount, 1);
    assert.equal(profilePage.petCount, 3);
    assert.equal(profilePage.greeting, 'Hey brother!');
    assert.equal(profilePage.environment, 'Urban village');
    assert.equal(profilePage.languages, 'English, Klingon');
    assert.equal(profilePage.freeTime, 'Clapping like a chicken');
    assert.equal(profilePage.favoriteFood, 'Ice cream sandwiches');
    assert.equal(profilePage.movieGenre, 'Comedy');
    assert.equal(profilePage.usedSubstances, 'Alcohol');
    assert.deepEqual(profilePage.acceptableSubstances.split(/,\s+/).sort(), [
      'Marijuana',
      'Tobacco'
    ]);
    assert.equal(profilePage.question, 'But where did the lighter fluid come from?');
    await profilePage.footer.next();

    assert.equal(currentRouteName(), 'auth.host.thankyou');
  });

  test('back links', async function(assert) {
    await profilePage.visit();
    assert.equal(currentRouteName(), 'auth.host.profile');
    await profilePage.footer.back();
    assert.equal(currentRouteName(), 'auth.host.review3');
    await review3Page.footer.back();
    assert.equal(currentRouteName(), 'auth.host.question');
    await questionPage.footer.back();
    assert.equal(currentRouteName(), 'auth.host.relationship');
    await relationshipPage.footer.back();
    assert.equal(currentRouteName(), 'auth.host.review2');
    await review2Page.footer.back();
    assert.equal(currentRouteName(), 'auth.host.photos');
    await photosPage.footer.back();
    assert.equal(currentRouteName(), 'auth.host.activities');
    await activitiesPage.footer.back();
    assert.equal(currentRouteName(), 'auth.host.location');
    await locationPage.footer.back();
    assert.equal(currentRouteName(), 'auth.host.review1');
    await review1Page.footer.back();
    assert.equal(currentRouteName(), 'auth.host.substances');
    await substancesPage.footer.back();
    assert.equal(currentRouteName(), 'auth.host.about');
    await aboutPage.footer.back();
    assert.equal(currentRouteName(), 'auth.host.bio');
    await bioPage.footer.back();
    assert.equal(currentRouteName(), 'auth.host.greeting');
    await greetingPage.footer.back();
    assert.equal(currentRouteName(), 'auth.host.index');
  });
});
