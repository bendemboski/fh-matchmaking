import Serializer from './application';

export default Serializer.extend({
  include: Object.freeze([ 'residents' ]),
  embed: true
});
