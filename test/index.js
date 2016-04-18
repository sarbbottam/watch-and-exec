const assert = require('assert');

const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;

const dir = path.join(process.cwd(), 'test/fixtures');
const command = path.join(process.cwd(), './test/logger');

exec(`mkdir -p ./test/fixtures`);
exec(`rm -rf ./test/log`);

exec(`nohup ./src/index.js -d=${dir} -c=${command} > /dev/null 2>&1 &`, function(error, stdout, stderr) {
  assert.equal(error, null);
});

setTimeout(() => {
  exec(`touch ./test/fixtures/foo_{1..2}`);
}, 200)

setTimeout(() => {
  exec('ps -ef | grep ' + dir + ' | grep -v grep | awk \'{print $2}\' | xargs kill -9', function(error, stdout, stderr) {
    const log = fs.readFileSync(path.join(process.cwd(), './test/log'), 'utf8');
    assert.equal(log, 'foo_1\nfoo_2\n');
    console.log('All the test have passed successfully');
    exec(`rm -rf ./test/fixtures`);
    exec(`rm -rf ./test/log`);
  });
}, 300)
