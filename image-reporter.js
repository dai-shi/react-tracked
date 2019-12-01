/* eslint-disable */

const fs = require('fs');

class ImageReporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig;
    this._options = options;
  }

  onTestResult(test, testResult, aggregateResults) {
    if (testResult.numFailingTests && testResult.failureMessage.match(/different from snapshot/)) {
      const files = fs.readdirSync('./__tests__/e2e/__image_snapshots__/__diff_output__/');
      files.forEach((value) => {
        const buf = fs.readFileSync(`./__tests__/e2e/__image_snapshots__/__diff_output__/${value}`);
        console.log('diff_output:', value);
        console.log(buf.toString('base64'));
      });
    }
  }
}

module.exports = ImageReporter;
