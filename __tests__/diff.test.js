import { parseJSON, parseYaml } from '../src/parsers.js';
import { readFile } from '../helpers/utils.js';
import genDiff from '../src/diff.js';
import buildDiff from '../formatters/index.js';

// JSON
const tree1_file1_JSON = readFile('tree1_file1.json');
const tree1_file2_JSON = readFile('tree1_file2.json');

// YAML
const tree1_file1_YAML = readFile('tree1_file1.yaml');
const tree1_file2_YAML = readFile('tree1_file2.yaml');

const result1 = readFile('result_stylish.txt');
const result2 = readFile('result_plain.txt');
const result3 = readFile('result_json.txt');

test('diff 2 JSON files - format stylish', () => {
  const object1 = parseJSON(tree1_file1_JSON);
  const object2 = parseJSON(tree1_file2_JSON);
  const diff = genDiff(object1, object2);
  const result = buildDiff(diff);
  expect(result).toBe(result1);
});

test('diff 2 YAML files - format stylish', () => {
  const object1 = parseYaml(tree1_file1_YAML);
  const object2 = parseYaml(tree1_file2_YAML);
  const diff = genDiff(object1, object2);
  const result = buildDiff(diff);
  expect(result).toBe(result1);
});

test('diff 2 JSON files - format plain', () => {
  const object1 = parseJSON(tree1_file1_JSON);
  const object2 = parseJSON(tree1_file2_JSON);
  const diff = genDiff(object1, object2);
  const result = buildDiff(diff, 'plain');
  expect(result).toBe(result2);
});

test('diff 2 JSON files - format json', () => {
  const object1 = parseJSON(tree1_file1_JSON);
  const object2 = parseJSON(tree1_file2_JSON);
  const diff = genDiff(object1, object2);
  const result = buildDiff(diff, 'json');
  expect(result).toBe(result3);
});
