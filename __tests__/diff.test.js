import { parseJSON, parseYaml } from '../src/parsers.js';
import { readFile } from '../helpers/utils.js';
import { genDiff } from '../src/diff.js';
import { buildDiff } from '../src/format.js';

// JSON
const file1 = readFile('tree1_file1.json');
const file2 = readFile('tree1_file2.json');

// YAML
//const file3 = readFile('file1_flat.yaml');
//const file4 = readFile('file2_flat.yaml');

const result1 = readFile('result1.txt');

test('diff 2 tree json files', () => {
  const object1 = parseJSON(file1);
  const object2 = parseJSON(file2);
  const diff = genDiff(object1, object2);
  const result = buildDiff(diff);
  expect(result).toBe(result1);
});

