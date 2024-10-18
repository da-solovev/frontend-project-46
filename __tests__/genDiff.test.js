import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import genDiff from '../src/genDiff.js';

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

test('diff 2 JSON files - format stylish', () => {
  const result = genDiff(file1Json, file2Json);
  expect(result).toBe(result1);
});

test('diff 2 YAML files - format stylish', () => {
  const result = genDiff(file1Yaml, file2Yaml);
  expect(result).toBe(result1);
});

test('diff 2 JSON files - format plain', () => {
  const result = genDiff(file1Json, file2Json, 'plain');
  expect(result).toBe(result2);
});

test('diff 2 JSON files - format json', () => {
  const result = genDiff(file1Json, file2Json, 'json');
  expect(result).toBe(result3);
});

test('check empty object', () => {
  const file1Empty = getFixturePath('file1_empty.json');
  const file2Empty = getFixturePath('file2_empty.json');
  const result = genDiff(file1Empty, file2Empty);
  expect(result).toBe('{\n}');
});

test('check unknown format', () => {
  expect(() => { genDiff(file1Json, file2Json, 'format123'); }).toThrow('Unknown format');
});

test('check unknown file ext', () => {
  const file1 = getFixturePath('file1.ini');
  expect(() => { genDiff(file1Json, file1); }).toThrow("File extension '.ini' not supported");
});
