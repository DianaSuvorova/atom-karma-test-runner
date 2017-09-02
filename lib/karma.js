'use babel';
import path from 'path';
import { EventEmitter } from 'events';
import { spawn } from 'child_process';
import ansi from 'ansi-html-stream';

// context: { root, nodeBinary, env, karmaBinary, karmaConfig, karmaReporter, specPath};

class KarmaWrapper extends EventEmitter {
  constructor(context, testSpawn) {
    super();
    this.context = context;
    this.karma = null;
    this.spawn = testSpawn || spawn;
  }

  run () {
    const env = {
      PATH: [process.env.PATH, path.dirname(this.context.nodeBinary)].join(':')
    };
    const flags = [
      this.context.karmaBinary,
      "start",
      this.context.karmaConfig,
      "--single-run",
      `--reporters=${this.context.karmaReporter}`,
      this.context.specPath || '',
    ];

    const options = {
      cwd: this.context.root,
      env: env,
    };
    this.karma = this.spawn(this.context.nodeBinary, flags, options);
    const handle = data => {
      return this.emit('output', data.toString());
    }

    const stream = ansi({chunked: false});
    this.karma.stdout.pipe(stream);
    this.karma.stderr.pipe(stream);
    stream.on('data', handle);

    return this.karma.on('exit', code => {
      if (code === 0) {
        return this.emit('success');
      } else {
        return this.emit('failure');
      }
    });
  }

}

export default KarmaWrapper;
