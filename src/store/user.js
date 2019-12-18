/* eslint no-param-reassign: 0 */

import { action } from 'easy-peasy';

const user = {
  data: {},
  isLoggedIn: false,
  setUser: action((state, payload) => {
    state.data = payload;
  }),
  setIsLoggedIn: action((state, payload) => {
    state.isLoggedIn = payload;
  }),
};

export default user;
