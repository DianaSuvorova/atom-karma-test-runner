# Atom Karma Test Runner

Run karma tests directly from Atom IDE. No additional server or setup needed.

![preview](http://g.recordit.co/LJ2bbiXxQF.gif)

## Package settings:
- `nodeBinaryPath` Path to the node executable. Should match the result of ```which node``` in your terminal. Defaults to */usr/local/bin/node*.
-  `karmaConfigFileName` Karma configuration file. Defaults to *karma.conf.js*.
- `karmaReporter` Karma reporter. The plugin looks best with [karma-mocha-reporter](https://www.npmjs.com/package/karma-mocha-reporter). Just make sure it is installed for the package you are executing tests for.
- `runActiveFileOnly`  Whether plugin will execute every test karma is configured for, or run just currently active file. Please note that running a single file **requires additional configuration** see below.
- `env` Any additional environment variables.


## Running:
Open a test file  and `Packages` -> `atom-karma-test-runner` -> `run` from atom menu.
This plugin looks for the closest `package.json` to the current file to get karma config file and `karma` executable.

## Configuring plugin to execute a single file:
By default every singe test that is karma has been configured for will be executed. To run only a single file that is currently active in atom set  `runActiveFileOnly` to `true` in the package settings and update `karma.conf.js` or karma configuration file as follows:

```
const defaultPath = 'lib/**/test/*.js' // the path you would normally configure karma
const path = (process.argv[process.argv.length - 1] || defaultPath);
module.exports = (config) => {
  config.set({
    ...
    files: [path],
    ...
  })
};
```
Please see complete example: [karma.conf.js](spec/testpackage/karma.conf.js)

Karma does not provide a standard documented way to run a single test or a file.
Few options are available:
- with jasmine one may use [focused specs](https://jasmine.github.io/2.1/focused_specs.html) change ```it``` -> ```fit``` or ```describe``` -> ```fdescribe```. But this requires a code change and may easily get committed by mistake.
- there is also an undocumented `--grep` karma flag to search for a test description. But this would run every single test anyways and just filters the output for the searched term.
- provide a path as an extra argument for karma and format config file to read this argument. That is the option I ended up using.
