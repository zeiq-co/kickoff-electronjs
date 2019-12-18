require('dotenv').config({ path: './.env.local' });
const fs = require('fs');
const path = require('path');
const { notarize } = require('electron-notarize');

const { APPLE_ID, SKIP_SIGN, APPLE_ID_PASS } = process.env;

module.exports = async function(params) {
  const { electronPlatformName, appOutDir } = params;

  if (electronPlatformName !== 'darwin' || SKIP_SIGN === 'true') {
    return;
  }

  console.log('afterSign hook triggered');

  const appId = 'co.zeiq.kickoff-electron';

  const appPath = path.join(
    appOutDir,
    `${params.packager.appInfo.productFilename}.app`,
  );

  if (!fs.existsSync(appPath)) {
    throw new Error(`Cannot find application at: ${appPath}`);
  }

  console.log(`Notarizing ${appId} found at ${appPath}`);

  try {
    const notarizeConfig = {
      appBundleId: appId,
      appPath,
      appleId: APPLE_ID,
      appleIdPassword: APPLE_ID_PASS,
    };
    // await notarize(notarizeConfig); // TODO: enable this to sign apple mac app
  } catch (error) {
    console.error(error);
  }

  console.log(`Done notarizing ${appId}`);
};
