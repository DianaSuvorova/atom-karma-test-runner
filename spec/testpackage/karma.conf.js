module.exports = (config) => {
  config.set({
    frameworks: ['jasmine'],
    colors: true,
    files: ['specs/spec.js'],
    reporters: ['mocha'],
    logLevel: config.LOG_INFO,
    concurrency: Infinity,
    browsers: ['PhantomJS'],
  });
};
