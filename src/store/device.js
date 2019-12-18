/* eslint no-param-reassign: 0 */

import { action } from 'easy-peasy';

const device = {
  isOnline: false,
  setIsOnline: action((state, payload) => {
    state.isOnline = payload;
  }),
};

export default device;
