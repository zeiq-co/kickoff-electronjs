const path = require('path');

const isDev = require('electron-is-dev');

const localUrl = 'http://localhost:3000';

const prodUrl = `file://${path.join(__dirname, '../build/index.html')}`;

const appUrl = isDev ? localUrl : prodUrl;

let iconPath = path.join(__dirname, 'icons/iconTemplate.png');

if (process.platform !== 'darwin') {
  iconPath = path.join(__dirname, 'icons/iconLight.png');
}

module.exports = {
  appUrl,
  iconPath,
};
