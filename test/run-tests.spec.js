'use strict';


const runTests = require('../src/run-tests');


describe('run-tests', () => {

  it('should be a function', () => {
    expect(typeof runTests).toBe('function');
  });

});
