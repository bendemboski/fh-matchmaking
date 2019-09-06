import { module, test } from 'qunit';
import { currentRouteName } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import moment from 'moment';
import loginUser from '../../helpers/login-user';
import newResidentPage from '../../pages/caseworker/new-resident';
import indexPage from '../../pages/caseworker/resident/index';
import bioPage from '../../pages/caseworker/resident/bio';
import aboutPage from '../../pages/caseworker/resident/about';
import locationPage from '../../pages/caseworker/resident/location';
import questionPage from '../../pages/caseworker/resident/question';
import profilePage from '../../pages/caseworker/resident/profile';
import imageBlob from '../../helpers/image-blob';

module('Acceptance | caseworker/resident profile', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  let mirageUser;

  hooks.beforeEach(async function() {
    mirageUser = await loginUser('caseworker');
  });

  test('build profile', async function(assert) {
    await newResidentPage.visit();

    // new resident
    await newResidentPage.profilePic.setImage(new File([ imageBlob ], 'foo.jpg', { type: 'image/jpeg' }));
    await newResidentPage.firstName.fillIn('Buster');
    await newResidentPage.lastName.fillIn('Bluth');
    await newResidentPage.email.fillIn('buster@bluth.com');
    await newResidentPage.phoneNumber.fillIn('5155558682');
    await newResidentPage.footer.next();

    mirageUser.reload();
    assert.equal(mirageUser.residents.length, 1);
    let mirageResident = mirageUser.residents.models[0];
    assert.equal(mirageResident.profilePic, 'http://s3.amazon.com/download');
    assert.equal(mirageResident.firstName, 'Buster');
    assert.equal(mirageResident.lastName, 'Bluth');
    assert.equal(mirageResident.email, 'buster@bluth.com');
    assert.equal(mirageResident.phoneNumber, '5155558682');

    // bio
    assert.equal(currentRouteName(), 'auth.caseworker.resident.bio');
    let m = moment().subtract(32, 'years');
    m.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    await bioPage.age.fillIn("28");
    await bioPage.gender.fillIn('Male');
    await bioPage.occupation.fillIn('Banana Stand Manager');
    await bioPage.languages.fillIn('English, Klingon');
    await bioPage.kidCount.increment();
    await bioPage.petCount.increment();
    await bioPage.petCount.increment();
    await bioPage.petBreed.fillIn('Beagle');
    await bioPage.footer.next();

    mirageUser.reload();
    mirageResident = mirageUser.residents.models[0];
    assert.strictEqual(mirageResident.age, 28);
    assert.equal(mirageResident.gender, 'male');
    assert.equal(mirageResident.occupation, 'Banana Stand Manager');
    assert.equal(mirageResident.languages, 'English, Klingon');
    assert.equal(mirageResident.kidCount, 1);
    assert.equal(mirageResident.petCount, 2);
    assert.equal(mirageResident.petBreed, 'Beagle');

    // about
    assert.equal(currentRouteName(), 'auth.caseworker.resident.about');
    await aboutPage.freeTime.fillIn('Clapping like a chicken');
    await aboutPage.favoriteFood.fillIn('Ice cream sandwiches');
    await aboutPage.movieGenre.fillIn('Comedy');
    await aboutPage.funFact.fillIn('I am Gene Parmesan');
    await aboutPage.substancePicker.chooseSubstances([ 'Marijuana', 'Tobacco' ]);
    await aboutPage.footer.next();

    mirageUser.reload();
    mirageResident = mirageUser.residents.models[0];
    assert.equal(mirageResident.freeTime, 'Clapping like a chicken');
    assert.equal(mirageResident.favoriteFood, 'Ice cream sandwiches');
    assert.equal(mirageResident.movieGenre, 'comedy');
    assert.equal(mirageResident.funFact, 'I am Gene Parmesan');
    assert.deepEqual(mirageResident.hostSubstances.sort(), [ 'marijuana', 'tobacco' ].sort());

    // location
    assert.equal(currentRouteName(), 'auth.caseworker.resident.location');
    await locationPage.neighborhood1.fillIn('U District');
    await locationPage.neighborhood2.fillIn('Alki');
    await locationPage.neighborhood3.fillIn('Mount Baker');
    await locationPage.link.fillIn(true);
    await locationPage.environment.fillIn('Urban village');
    await locationPage.footer.next();

    mirageUser.reload();
    mirageResident = mirageUser.residents.models[0];
    assert.deepEqual(mirageResident.neighborhoods.sort(), [
      'uDist',
      'alki',
      'mountBaker'
    ].sort());
    assert.equal(mirageResident.link, true);
    assert.equal(mirageResident.neighborhoodFeatures, 'Urban village');

    // question
    assert.equal(currentRouteName(), 'auth.caseworker.resident.question');
    await questionPage.question.fillIn('But where did the lighter fluid come from?');
    await questionPage.additionalNote.fillIn('You\'re gonna get some hop-ons');
    await questionPage.footer.next();

    mirageUser.reload();
    mirageResident = mirageUser.residents.models[0];
    assert.equal(mirageResident.question, 'But where did the lighter fluid come from?');
    assert.equal(mirageResident.additionalNote, 'You\'re gonna get some hop-ons');

    // profile
    assert.equal(currentRouteName(), 'auth.caseworker.resident.profile');
    assert.equal(profilePage.profilePic, 'http://s3.amazon.com/download');
    assert.equal(profilePage.name, 'Buster Bluth');
    assert.equal(profilePage.gender, 'Male');
    assert.equal(profilePage.age, 28);
    assert.equal(profilePage.occupation, 'Banana Stand Manager');
    assert.equal(profilePage.email, 'buster@bluth.com');
    assert.equal(profilePage.phoneNumber, '5155558682');
    assert.equal(profilePage.kidCount, 1);
    assert.equal(profilePage.petCount, 2);
    assert.equal(profilePage.petBreed, 'Beagle');
    assert.equal(profilePage.neighborhoods, 'U District, Alki, Mount Baker');
    assert.equal(profilePage.transportation.hasLink, true);
    assert.equal(profilePage.environment, 'Urban village');
    assert.equal(profilePage.languages, 'English, Klingon');
    assert.equal(profilePage.freeTime, 'Clapping like a chicken');
    assert.equal(profilePage.favoriteFood, 'Ice cream sandwiches');
    assert.equal(profilePage.movieGenre, 'Comedy');
    assert.deepEqual(profilePage.acceptableSubstances.split(/,\s+/).sort(), [
      'Marijuana',
      'Tobacco'
    ]);
    assert.equal(profilePage.question, 'But where did the lighter fluid come from?');
    await profilePage.footer.next();
  });

  test('back links', async function(assert) {
    let mirageResident = mirageUser.createResident();

    await profilePage.visit({ 'resident_profile_id': mirageResident.id });
    assert.equal(currentRouteName(), 'auth.caseworker.resident.profile');
    await profilePage.footer.back();
    assert.equal(currentRouteName(), 'auth.caseworker.resident.question');
    await questionPage.footer.back();
    assert.equal(currentRouteName(), 'auth.caseworker.resident.location');
    await locationPage.footer.back();
    assert.equal(currentRouteName(), 'auth.caseworker.resident.about');
    await aboutPage.footer.back();
    assert.equal(currentRouteName(), 'auth.caseworker.resident.bio');
    await bioPage.footer.back();
    assert.equal(currentRouteName(), 'auth.caseworker.resident.index');
  });

  test('can go back to index page to edit resident basic info', async function(assert) {
    await newResidentPage.visit();

    // new resident
    await newResidentPage.firstName.fillIn('Buster');
    await newResidentPage.lastName.fillIn('Bluth');
    await newResidentPage.email.fillIn('buster@bluth.com');
    await newResidentPage.phoneNumber.fillIn('5155558682');
    await newResidentPage.footer.next();

    await bioPage.footer.back();
    assert.equal(currentRouteName(), 'auth.caseworker.resident.index');
    await indexPage.firstName.fillIn('Gene');
    await indexPage.lastName.fillIn('Parmesan');
    await indexPage.email.fillIn('geneparmesan@aol.com');
    await indexPage.phoneNumber.fillIn('5552223344');

    await indexPage.footer.next();
    assert.equal(currentRouteName(), 'auth.caseworker.resident.bio');

    mirageUser.reload();
    let mirageResident = mirageUser.residents.models[0];
    assert.equal(mirageResident.firstName, 'Gene');
    assert.equal(mirageResident.lastName, 'Parmesan');
    assert.equal(mirageResident.email, 'geneparmesan@aol.com');
    assert.equal(mirageResident.phoneNumber, '5552223344');
  });
});
