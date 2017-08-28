'use babel';
import os from 'os';

const config = {
  nodeBinaryPath: {
      type: 'string',
      'default': os.platform() === 'win32' ? 'C:\\Program Files\\nodejs\\node.exe' : '/usr/local/bin/node',
      description: 'Path to the node executable'
    },
    karmaCommand: {
      type: 'string',
      'default': os.platform() === 'win32' ? 'karma.cmd' : 'karma',
      description: 'Command to run karma'
    },
    karmaConfigFileName: {
      type: 'string',
      'default': 'karma.conf.js',
      description: 'Karma configuration file'
    },
    env: {
      type: 'string',
      'default': '',
      description: 'Append environment variables'
    }
};

export default config;
