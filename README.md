# Atom Karma test Runner

Run karma tests directly from Atom IDE. No additional server or setup needed.

![preview](http://g.recordit.co/LJ2bbiXxQF.gif)

## Package settings:
- `nodeBinaryPath` Path to the node executable. Should match the result of ```which node``` in your terminal. Defaults to */usr/local/bin/node*.
-  `karmaConfigFileName` Karma configuration file. Defaults to *karma.conf.js*.
- `karmaReporter` Karma reporter. The plugin looks best with ![karma-mocha-reporter](https://www.npmjs.com/package/karma-mocha-reporter). Just make sure it is installed for the package you are executing tests for.
- `env` Any additional environment variables.

## Running:
Open a test file  and `Packages` -> `atom-karma-test-runner` -> `run` from atom menu.
This plugin looks for the closest `package.json` to the current file to get karma config file and `karma` executable.
Plugin will run **every** test that karma is configured for in the project.
