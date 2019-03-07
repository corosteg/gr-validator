'use strict';


const deleteRepo = require('../src/delete-repo');


describe('delete-repo', () => {

  it('should be a function', () => {
    expect(typeof deleteRepo).toBe('function');
  });

});
