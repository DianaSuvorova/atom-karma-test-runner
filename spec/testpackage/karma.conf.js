const defaultPath = 'specs/*.js'
const path = (process.argv[process.argv.length - 1] || defaultPath);
module.exports = (config) => {
  config.set({
    frameworks: ['jasmine'],
    colors: true,
    files: [path],
    reporters: ['mocha'],
    logLevel: config.LOG_INFO,
    concurrency: Infinity,
    browsers: ['PhantomJS'],
  });
};
