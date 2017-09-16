'use babel';

import Karma from '../lib/karma';
import path from 'path';

describe('karma', () => {
  const stdout = { pipe: () => null };
  const stderr = { pipe: () => null };

  const child_process = {
    stderr: stderr,
    stdout: stdout,
    spawn: () => this,
    on: () => null,
  };
  const testpackage = path.join(__dirname, 'testpackage');


  describe('run', () => {
    it('spawns karma process', () => {
      spyOn(child_process, 'spawn').andReturn(child_process);
      const karma = new Karma({
       root: testpackage,
       nodeBinary: 'node',
       karmaBinary: path.join(testpackage, 'node_modules', '.bin', 'karma'),
       karmaConfig: 'karma.conf.js',
       karmaReporter: 'mocha',
       env: process.env,
     }, child_process.spawn);
      karma.run();
      expect(child_process.spawn).toHaveBeenCalled();
    });

  });
});
