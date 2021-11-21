#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
import showDiff from '../src/index.js';

const program = new Command();

program
  .description('Compares two configuration __fixtures__ and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((firstFile, secondFile, format) => {
    const result = showDiff(firstFile, secondFile, format.format);
    console.log(result);
  });
program.parse(process.argv);
