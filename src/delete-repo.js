const { exec } = require('child_process');

module.exports = (finalDirectory, tmp) => new Promise((resolve) => {
  console.log('rm -rf');
  const cmd = `rm -rf ${tmp}/${finalDirectory}`;
  exec(cmd, (err, stdout) => {
    resolve(stdout);
  });
});
