import ProfileBase from './profile-base';
import { findBy } from 'ember-awesome-macros/array';
import { raw } from 'ember-awesome-macros';
import { getLightRailStations } from '../../../utils/profile';

export default ProfileBase.extend({
  // computed property evaluating to the object in lightRailStations that
  // is currently selected
  selectedLightRailStation: findBy(
    'lightRailStations',
    raw('value'),
    'changeset.lightRailStation'
  ),

  init() {
    this._super(...arguments);

    this.set('lightRailStations', [
      { label: '(none)', value: '' },
      ...getLightRailStations()
    ]);
  }
});
