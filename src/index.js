import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

const rootEl = document.getElementById('root');

ReactDOM.render(<App />, rootEl);

// https://medium.com/superhighfives/hot-reloading-create-react-app-73297a00dcad
if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    ReactDOM.render(<NextApp />, rootEl);
  });
}
