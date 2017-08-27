'use babel';
import path from 'path';
import { EventEmitter } from 'events';
import { spawn } from 'child_process';

/*globals
  atom
*/

class KarmaWrapper extends EventEmitter {
  constructor(context) {
    super();
    this.context = context;
    this.karma = null;
    this.node = atom.config.get('atom-karma-test-runner.nodeBinaryPath') || '/Users/dsuvorova/.nvm/versions/node/v7.7.1/bin/node';
    this.env = atom.config.get('atom-karma-test-runner.env');
  }

  run () {
    const env = {
      PATH: [process.env.PATH, path.dirname(this.node)].join(':')
    };
    const flags = [
      this.context.karma,
      "start",
      this.context.karmaConfig,
      "--single-run",
      "--reporters=dots",
    ];

    const options = {
      cwd: this.context.root,
      env: env
    };

    this.karma = spawn(this.node, flags, options);

    const handle = data => {
      return this.emit('output', data.toString());
    }

    this.karma.stdout.on('data', handle);
    this.karma.stderr.on('data', handle);

    return this.karma.on('exit', code => {
      if (code === 0) {
        return this.emit('success', this.stats);
      } else {
        return this.emit('failure', this.stats);
      }
    });
  }

}

export default KarmaWrapper;
