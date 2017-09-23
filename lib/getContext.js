'use babel';
import fs from 'fs';
import path from 'path';
import os from 'os';

/* globals
atom
*/

const getContext = editor => {
  const activeFile = editor.getPath();
  const root = closestPackage(activeFile);
  if (root) {
    const nodeBinary = atom.config.get('atom-karma-test-runner.nodeBinaryPath');
    const env = atom.config.get('atom-karma-test-runner.env');
    const karmaReporter = atom.config.get('atom-karma-test-runner.karmaReporter');
    const karmaConfigFileName = atom.config.get('atom-karma-test-runner.karmaConfigFileName');
    const karmaBinary = os.platform() === 'win32' ?
      path.join(root, 'node_modules', 'karma', 'bin', 'karma') :
      path.join(root, 'node_modules', '.bin', 'karma');
    const karmaConfig = path.join(root, karmaConfigFileName);
    const runActiveFileOnly = atom.config.get('atom-karma-test-runner.runActiveFileOnly');
    const specPath = (runActiveFileOnly) ? path.relative(root, activeFile) : null;

    return {
      root: root,
      nodeBinary,
      env,
      karmaBinary,
      karmaConfig: karmaConfig,
      karmaReporter,
      specPath,
    };
  }
};

export const closestPackage = function(folder) {
  const pkg = path.join(folder, 'package.json');
  if (fs.existsSync(pkg)) {
    return folder;
  } else if (folder === '/') {
    return null;
  } else {
    return closestPackage(path.dirname(folder));
  }
};

export default getContext;
