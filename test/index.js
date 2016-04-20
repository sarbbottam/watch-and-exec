const assert = require('assert');

const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;

const dir = path.join(process.cwd(), 'test/fixtures');
const command = `'${path.join(process.cwd(), './test/logger')} sarbbottam'`;

exec(`mkdir -p ./test/fixtures`);
exec(`rm -rf ./test/log`);

exec(`nohup ./src/index.js -d=${dir} -c=${command} > /dev/null 2>&1 &`, error => {
  assert.equal(error, null);

  setTimeout(() => {
    exec(`touch ./test/fixtures/foo`);
    setTimeout(() => {
      exec(`ps -ef | grep ${dir} | grep -v grep | awk '{print $2}' | xargs kill -9`, () => {
        const log = fs.readFileSync(path.join(process.cwd(), './test/log'), 'utf8');
        assert.notEqual(log.indexOf('sarbbottam'), -1);
        console.log('All the test have passed successfully');
        exec(`rm -rf ./test/fixtures`);
        exec(`rm -rf ./test/log`);
      });
    }, 100);
  }, 1000);
});
