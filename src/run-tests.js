const { exec } = require('child_process');

const linterMess = (finalDirectory, tmp) => new Promise((resolve) => {
  
  const cmd = `cd ${tmp}/${finalDirectory} ; rm -rf .eslintrc ; ` +
    'cp LABORATORIA_STAFF_TEST/laboratoria_test/.eslintrc . ; ' +
    'node ./node_modules/eslint/bin/eslint.js -f json .js src/ test/';
  const data = {};

  exec(cmd, (err, stdout) => {
    if (err) {
      data.eslintFail = '1';
      data.eslintMessage = JSON.parse(stdout);
      resolve(data);
    } else {
      data.eslintFail = '0';
      data.eslintMessage = JSON.parse(stdout);
      resolve(data);
    }
  });
});

const unitHackerTestMess = (finalDirectory, tmp) => new Promise((resolve) => {
  
  const cmd = `cd ${tmp}/${finalDirectory} && node ./node_modules/jest/bin/jest.js ` +
    '--json LABORATORIA_STAFF_TEST/laboratoria_test/cipher-hacker.spec.js 2>&-';
  const data = {};

  exec(cmd, (err, stdout) => {
    if (err) {
      data.unitHackerTestFail = '1';
      data.unitHackerTestMessage = JSON.parse(stdout);
      resolve(data);
    } else {
      data.unitHackerTestFail = '0';
      data.unitHackerTestMessage = JSON.parse(stdout);
      resolve(data);
    }
  });
});

const studentUnitTestMess = (finalDirectory, tmp) => new Promise((resolve) => {

  const cmd = `cd ${tmp}/${finalDirectory} && ` +
    'node ./node_modules/jest/bin/jest.js --json --runTestsByPath test/* 2>&-';
  const data = {};

  exec(cmd, (err, stdout) => {
    if (err) {
      data.studentUnitTestFail = '1';
      data.studentUnitTestMessage = JSON.parse(stdout);
      resolve(data);
    } else {
      data.studentUnitTestFail = '0';
      data.studentUnitTestMessage = JSON.parse(stdout);
      resolve(data);
    }
  });
});

const studentCoverage = (finalDirectory, tmp) => new Promise((resolve) => {

  const cmd = `cd ${tmp}/${finalDirectory} ; rm -rf jest.config.json ; ` +
    'cp LABORATORIA_STAFF_TEST/laboratoria_test/jest.config.json . ; ' +
    'node ./node_modules/jest/bin/jest.js --config jest.config.json ' +
    '--runTestsByPath test/* ';
  const data = {};

  exec(cmd, (err) => {
    if (err) {
      data.studentCoverageFail = '1';
      resolve(data);
    } else {
      data.studentCoverageFail = '0';
      resolve(data);
    }
  });
});

const unitTestMess = (finalDirectory, tmp) => new Promise((resolve) => {

  const cmd = `cd ${tmp}/${finalDirectory} && node ./node_modules/jest/bin/jest.js ` +
    '--json LABORATORIA_STAFF_TEST/laboratoria_test/cipher.spec.js 2>&-';
  const data = {};

  exec(cmd, (err, stdout) => {
    if (err) {
      data.unitTestFail = '1';
      data.unitTestMessage = JSON.parse(stdout);
      resolve(data);
    } else {
      data.unitTestFail = '0';
      data.unitTestMessage = JSON.parse(stdout);
      resolve(data);
    }
  });
});

module.exports = (finalDirectory, tmp) => new Promise((resolve, reject) => {
  console.log('run tests');
  Promise.all([linterMess(finalDirectory, tmp),
    unitTestMess(finalDirectory, tmp),
    studentCoverage(finalDirectory, tmp),
    unitHackerTestMess(finalDirectory, tmp),
    studentUnitTestMess(finalDirectory, tmp)])
    .then(res => resolve(((res.reduce((arr1, arr2) => {
      Object.assign(arr1, arr2);
      return (arr1);
    })))))
    .catch(res => reject(res));
});
