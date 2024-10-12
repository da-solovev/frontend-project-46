import { parseJSON, parseYaml } from '../src/parsers.js';
import { readFile } from '../helpers/utils.js';
import { genDiff } from '../src/diff.js';
import { buildDiff } from '../src/format.js';

// JSON
const tree1_file1_JSON = readFile('tree1_file1.json');
const tree1_file2_JSON = readFile('tree1_file2.json');

// YAML
const tree1_file1_YAML = readFile('tree1_file1.yaml');
const tree1_file2_YAML = readFile('tree1_file2.yaml');

const result1 = readFile('result1.txt');

test('diff 2 tree JSON files', () => {
  const object1 = parseJSON(tree1_file1_JSON);
  const object2 = parseJSON(tree1_file2_JSON);
  const diff = genDiff(object1, object2);
  const result = buildDiff(diff);
  expect(result).toBe(result1);
});

test('diff 2 tree YAML files', () => {
  const object1 = parseYaml(tree1_file1_YAML);
  const object2 = parseYaml(tree1_file2_YAML);
  const diff = genDiff(object1, object2);
  const result = buildDiff(diff);
  expect(result).toBe(result1);
});

