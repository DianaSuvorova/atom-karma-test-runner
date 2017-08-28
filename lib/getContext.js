'use babel';
import fs from 'fs';
import path from 'path';

/* globals
atom
*/

const getContext = editor => {
  const root = closestPackage(editor.getPath());
  if (root) {
    const karmaCommand = atom.config.get('atom-karma-test-runner.karmaConfigFileName');
    const karmaConfigFileName = atom.config.get('atom-karma-test-runner.karmaCommand');
    let karmaBinary = path.join(root, 'node_modules', '.bin', karmaCommand);
    const karmaConfig = path.join(root, karmaConfigFileName);
    if (!fs.existsSync(karmaBinary)) {
      karmaBinary = 'karma';
    }
    return {
      root: root,
      test: path.relative(root, editor.getPath()),
      karma: karmaBinary,
      karmaConfig: karmaConfig,
    };
  } else {
    return {
      root: path.dirname(editor.getPath()),
      test: path.basename(editor.getPath()),
      karma: atom.config.get('mocha-test-runner.karmaCommand')
    };
  }
};

const closestPackage = function(folder) {
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
