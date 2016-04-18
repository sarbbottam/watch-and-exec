watch-and-exec
---

Watch a directory and on any changes, execute the desired command

## Usage

### `cli`

```
npm i watch-and-exec -g
watch-and-exec path/to/desired/dir 'command'
```

#### background process
You can also use execute the watcher in the background

```
nohup watch-and-exec path/to/desired/dir 'command' > /dev/null 2>&1 &
```

### local dependency

```
npm i watch-and-exec -S

const exec = require('child_process').exec;
const dir = 'path/to/directory';
const command = 'some executable';

exec(`./node_modules/.bin/watch-and-exec -d=${dir} -c=${command}`, function(error, stdout, stderr) {
  assert.equal(error, null);
});
```

#### background process
Use `nohup` to execute the watcher as a background process

```
exec(`nohup ./node_modules/.bin/watch-and-exec -d=${dir} -c=${command} > /dev/null 2>&1 &`, function(error, stdout, stderr) {
  assert.equal(error, null);
});

```