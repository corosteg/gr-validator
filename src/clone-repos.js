const { exec } = require('child_process');
const URL = require('url');

const cloneTestRepo = (repo, tmp, token) => {
  console.log('cloneTestRepo');
  return new Promise((resolve, reject) => {
    const gitObj = URL.parse(repo, true);
    const directory = gitObj.pathname.split('/');
    const finalDirectory = (directory[1] + directory[2]);
    const testRepo = (`https://${token}@github.com/Laboratoria/${directory[2]}-test.git`);
    const cmd = `git clone ${testRepo} ${tmp}/${finalDirectory}/LABORATORIA_STAFF_TEST`;

    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        reject(err);
        console.log(err);
        return;
      }
      if (stdout) {
        console.log(stdout);
      }
      if (stderr) {
        console.log(stderr);
      }
      resolve(stdout);

    });
  });
};

const cloneWorkRepo = (repo, tmp, finalDirectory) => {
  console.log('cloneWorkRepo');
  return new Promise((resolve, reject) => {
    const cmd = `rm -rf ${tmp}/${finalDirectory} ; git clone ${repo} ${tmp}/${finalDirectory}`;

    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        if (stdout) {
          console.log(stdout);
        }
        if (stderr) {
          console.log(stderr);
        }
        resolve(stdout);
      }
    });
  });
};

module.exports = (repo, tmp, finalDirectory, token) => new Promise((resolve, reject) => {
  cloneWorkRepo(repo, tmp, finalDirectory)
    .then(() => cloneTestRepo(repo, tmp, token))
    .then(res => resolve(res))
    .catch(res => reject(res));
});
