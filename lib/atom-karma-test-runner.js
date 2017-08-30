'use babel';
/*globals
atom
*/

import { CompositeDisposable } from 'atom';

import getContext from './getContext';
import KarmaTestRunnerView from './view';
import Karma from './karma';
import config from './config';

export default {
  config: config,
  jasmineTestRunnerView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.view = new KarmaTestRunnerView(state.jasmineTestRunnerViewState);
    this.modalPanel = atom.workspace.addBottomPanel({
      item: this.view.getElement(),
      visible: true
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-karma-test-runner:run': () => this.run()
    }));

    this.view.emitter.on('close', () => { this.close() });

  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.view.destroy();
  },

  serialize() {
    return {
      jasmineTestRunnerViewState: this.view.serialize()
    };
  },

  close() {
    this.modalPanel.hide();
  },

  run() {
    if (!this.modalPanel.isVisible()) {
      this.modalPanel.show();
    }
    const editor = atom.workspace.getActivePaneItem();

    const currentContext = getContext(editor);
    this.view.reset(currentContext.root);

    const karma = new Karma(currentContext);
    karma.on('success', () => {
      return this.view.success();
    });
    karma.on('failure', () => {
      return this.view.failure();
    });
    karma.on('output', text => {
      return this.view.addLine(text);
    });
    karma.on('error', err => {
      this.view.addLine('Failed to run Karma\n' + err.message);
      return this.view.failure();
    });


    return karma.run();
  }
}
