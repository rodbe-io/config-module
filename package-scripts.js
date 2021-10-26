/* eslint-disable @typescript-eslint/no-var-requires */

const { series, rimraf } = require('nps-utils');
const packageJSON = require('./package.json');

module.exports = {
  scripts: {
    default: 'nps start',
    dev: {
      description: 'serve in development',
      script: 'nodemon -L --exec ts-node -- ./test/index.ts',
    },
    build: {
      silent: true,
      script: series('nps log.build.init', 'nps lint.check', 'nps clean', 'nps transpile', 'nps log.build.done'),
    },
    lint: {
      check: {
        description: 'Check linting',
        silent: true,
        script: series('nps log.lint.check.init', `eslint 'src/**/*.{js,jsx,ts,tsx}'`),
      },
      fix: {
        description: 'Fix linting',
        script: series('nps log.lint.fix.init', `eslint '**/*.{js,jsx,ts,tsx}' --fix`),
      },
    },
    transpile: {
      description: 'TS to JS',
      silent: true,
      script: series('nps log.transpile.init', 'tsc'),
    },
    version: {
      major: release('major'),
      minor: release('minor'),
      patch: release('patch'),
      pre: release('pre'),
      release: {
        description: `Perform a release v${packageJSON.version}`,
        silent: true,
        script: series(
          'nps log.tag.init',
          `release-it --ci --git.tag=true --git.tagName="v${packageJSON.version}" --no-increment`
        ),
      },
    },
    clean: {
      default: {
        script: series('nps log.clean.init', 'nps clean.dist'),
        silent: true,
        description: 'Deletes the ./dist folder',
      },
      dist: {
        script: rimraf('./dist'),
        silent: true,
        hiddenFromHelp: true,
      },
    },
    log: {
      lint: {
        check: {
          init: log('info', 'Check linting'),
        },
        fix: {
          init: log('info', 'Fix linting'),
        },
      },
      build: {
        init: log('info', 'Building'),
        done: log('done', 'Building'),
      },
      clean: {
        init: log('info', 'Cleaning'),
      },
      tag: {
        init: log('info', 'Tagging'),
      },
      transpile: {
        init: log('info', 'Transpiling'),
      },
      version: {
        init: log('info', 'Versioning'),
      },
    },
  },
};

function release(version) {
  return {
    description: `Perform a release by ${version.toUpperCase()}`,
    hiddenFromHelp: true,
    script: series('nps log.version.init', `release-it --ci -i ${version}`),
    silent: true,
  };
}

function log(type, msg, label) {
  const scriptPath = `./scripts/logger ${type} '${msg}' ${label}`;

  return {
    description: `Show ${msg} log to the terminal`,
    hiddenFromHelp: true,
    script: run(scriptPath),
    silent: true,
  };
}

// utils

function run(path) {
  return `node ${path}`;
}
