'use babel';
import events from 'events';
export default class KarmaTestRunnerView {

  constructor() {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('karma-test-runner');
    this.emitter = new events.EventEmitter();
    this.mount()
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {

  }

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  mount () {
    this.header = document.createElement("div");
    this.header.classList.add('heading');
    this.header.innerHTML = `
        <span class="state">Karma test runner is ready!</span>
        <span class="spec"></span>
        <span class="close-icon">&times;</span>
      `;

    this.element.appendChild(this.header);
    this.state = this.header.getElementsByClassName('state')[0]
    this.spec = this.header.getElementsByClassName('spec')[0]
    this.close = this.header.getElementsByClassName('close-icon')[0];
    this.close.addEventListener('click', () => this.emitter.emit('close'));

    this.panelBody = document.createElement('div');
    this.panelBody.classList.add('panel-body');
    this.element.appendChild(this.panelBody);
  }

  reset(root) {
    this.header.classList.remove('alert-success');
    this.header.classList.remove('alert-danger');
    this.header.classList.add('alert-info');
    this.state.innerHTML = "Karma test runner:  ";
    this.spec.innerHTML = root;
    this.results = document.createElement('div');
    this.results.classList.add('results');
    this.panelBody.innerHTML = '';
    this.panelBody.appendChild(this.results);

  }

  success() {
    this.header.classList.remove('alert-info');
    this.header.classList.add('alert-success');
  }

  failure() {
    this.header.classList.remove('alert-info');
    this.header.classList.add('alert-danger');
  }

  addLine(line) {
    this.results.innerHTML += line;
  }

  getElement() {
    return this.element;
  }
}
