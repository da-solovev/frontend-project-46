#!/usr/bin/env node

import { Command } from 'commander';
import getParseData from '../src/parsers.js';
import genDiff from '../src/diff.js';
import buildDiff from '../formatters/index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.0')
  .argument('filepath1', 'path input file1')
  .argument('filepath2', 'path input file2')
  .option('-f, --format [type]', 'output format: stylish (default), plain, json')
  .action((filepath1, filepath2) => {
    const options = program.opts();
    const object1 = getParseData(filepath1);
    const object2 = getParseData(filepath2);
    const diff = (genDiff(object1, object2));
    console.log(buildDiff(diff, options.format));
  });

program.parse(process.argv);
