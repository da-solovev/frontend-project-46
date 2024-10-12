import { parseJSON, parseYaml } from '../helpers/parsers.js';
import readFile from '../helpers/utils.js';
import genDiff from '../src/diff.js';

// JSON
const file1 = readFile('file1_flat.json');
const file2 = readFile('file2_flat.json');
const file5 = readFile('file1_tree.json');
const file6 = readFile('file2_tree.json');

// YAML
const file3 = readFile('file1_flat.yaml');
const file4 = readFile('file2_flat.yaml');

const result1 = readFile('result1.txt');
const result2 = readFile('result2.txt');

test('diff 2 flat json files', () => {
  const object1 = parseJSON(file1);
  const object2 = parseJSON(file2);
  expect(genDiff(object1, object2)).toEqual(result1);
});

test('diff 2 flat yaml files', () => {
  const object1 = parseYaml(file3);
  const object2 = parseYaml(file4);
  expect(genDiff(object1, object2)).toEqual(result1);
});

test('diff 2 tree json files', () => {
  const object1 = parseJSON(file5);
  const object2 = parseJSON(file6);
  expect(genDiff(object1, object2)).toEqual(result2);
});
