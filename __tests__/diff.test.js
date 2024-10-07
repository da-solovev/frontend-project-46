import { parseJSON, parseYaml } from '../helpers/parsers.js';
import readFile from '../helpers/utils.js';
import genDiff from '../src/diff.js';

// JSON
const file1 = readFile('file1.json');
const file2 = readFile('file2.json');

// YAML
const file3 = readFile('file1.yaml');
const file4 = readFile('file2.yaml');

const result1 = readFile('result1.txt');

test('diff 2 json files', () => {
  const object1 = parseJSON(file1);
  const object2 = parseJSON(file2);
  expect(genDiff(object1, object2)).toEqual(result1);
});

test('diff 2 yaml files', () => {
  const object1 = parseYaml(file3);
  const object2 = parseYaml(file4);
  expect(genDiff(object1, object2)).toEqual(result1);
});
