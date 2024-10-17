import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import genDiff from '../src/diff.js';
import buildDiff from '../formatters/index.js';
import getParseData from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

// JSON
const file1Json = getFixturePath('file1_json.json');
const file2Json = getFixturePath('file2_json.json');

// YAML
const file1Yaml = getFixturePath('file1_yaml.yaml');
const file2Yaml = getFixturePath('file2_yaml.yaml');

const result1 = readFile('result_stylish.txt');
const result2 = readFile('result_plain.txt');
const result3 = readFile('result_json.txt');

const object1 = getParseData(file1Json);
const object2 = getParseData(file2Json);
const object3 = getParseData(file1Yaml);
const object4 = getParseData(file2Yaml);

test('diff 2 JSON files - format stylish', () => {
  const diff = genDiff(object1, object2);
  const result = buildDiff(diff);
  expect(result).toBe(result1);
});

test('diff 2 YAML files - format stylish', () => {
  const diff = genDiff(object3, object4);
  const result = buildDiff(diff);
  expect(result).toBe(result1);
});

test('diff 2 JSON files - format plain', () => {
  const diff = genDiff(object1, object2);
  const result = buildDiff(diff, 'plain');
  expect(result).toBe(result2);
});

test('diff 2 JSON files - format json', () => {
  const diff = genDiff(object1, object2);
  const result = buildDiff(diff, 'json');
  expect(result).toBe(result3);
});
