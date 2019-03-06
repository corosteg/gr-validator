const { exec } = require('child_process');

module.exports = (finalDirectory, tmp, isFirebaseEnv) => {
  console.log('runInstall');
  return new Promise((resolve, reject) => {
    const cmd = isFirebaseEnv
      ? `cd  ${tmp}/${finalDirectory} && /nodejs/bin/node /nodejs/bin/npm install`
      : `cd  ${tmp}/${finalDirectory} && npm install`;

    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      if (stderr) {
        console.log(stderr);
      }
      resolve(stdout);
    });
  });
};
