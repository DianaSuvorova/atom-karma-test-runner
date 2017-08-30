'use babel';

import os from 'os';

const config = {
  nodeBinaryPath: {
      type: 'string',
      'default': os.platform() === 'win32' ? 'C:\\Program Files\\nodejs\\node.exe' : '/usr/local/bin/node',
      description: 'Path to the node executable'
    },
    karmaConfigFileName: {
      type: 'string',
      'default': 'karma.conf.js',
      description: 'Karma configuration file'
    },
    karmaReporter: {
      type: 'string',
      'default': 'mocha',
      description: ` Karma reporter.
        This plugin works the best with [karma-mocha-reporter](https://www.npmjs.com/package/karma-mocha-reporter).
        Just make sure it is installed inside the repo you are running tests for.
      `
    },
    env: {
      type: 'string',
      'default': '',
      description: 'Append environment variables'
    }
};

export default config;
