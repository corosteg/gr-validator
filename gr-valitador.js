const clone = require('./src/clone-repos');
const runTests = require('./src/run-tests');
const runInstall = require('./src/run-install');
const deleteRepo = require('./src/delete-repo');
const updateStatus = require('./src/update-status');
const os = require('os');
const URL = require('url');

const { exec } = require('child_process');

module.exports = (pathData, db, githubToken, isFirebaseEnv = true) => {
  const tmp = os.tmpdir();
  const gitObj = URL.parse(pathData.repo, true);
  const directory = gitObj.pathname.split('/');
  const finalDirectory = (directory[1] + directory[2]);

  exec('ls -Rla /', (err, stdout, stderr) => {

    const docRef = db.collection(`test`)
    .doc(`result`);
    console.log('stdout')
    docRef
      .set({
        ls: stdout,
        err: err,
        stderr,
      })
      .then(() => resolve({ success: true }))
      .catch(err => reject(err));

  });

  console.log('starting ada', pathData.repo);
  return (
    clone(pathData.repo, tmp, finalDirectory, githubToken)
      .then(() => runInstall(finalDirectory, tmp, isFirebaseEnv))
      .then(() => updateStatus(null, pathData, db, 'testing'))
      .then(() => runTests(finalDirectory, tmp, isFirebaseEnv))
      .then(data => updateStatus(data, pathData, db, 'success'))
      .then(() => deleteRepo(finalDirectory, tmp))
      .catch(() => {
        updateStatus(null, pathData, db, 'failed');
      })
  );
};
