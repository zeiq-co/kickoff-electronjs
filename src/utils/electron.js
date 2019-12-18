/* eslint import/no-mutable-exports: 0 */

let electron = {
  getVersion() {
    return null;
  },
};

if (typeof window.require === 'function') {
  const { app } = window.require('electron').remote;
  electron = app;
}
// electron.getVersion()

export default electron;
