#!/usr/bin/env node

const fs = require('fs');
const exec = require('child_process').exec;

function watch(dir, command) {
  fs.watch(dir, {
    persistent: true,
    recursive: true
  },
  (event, filename) => {
    if (filename) {
      exec(command);
    }
  });
}

const options = {
  dir: ['d'],
  command: ['c']
};

const argv = require('yargs')
  .demand(['d', 'c'])
  .strict()
  .alias(options)
  .argv;

watch(argv.d, argv.c);
