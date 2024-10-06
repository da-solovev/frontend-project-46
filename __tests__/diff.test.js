import parse from '../helpers/parse.js';
import readFile from '../helpers/utils.js';
import genDiff from '../src/diff.js';

const file1 = readFile('file1.json');
const file2 = readFile('file2.json');

const result1 = readFile('result1.txt');

test('diff 2 json files', () => {
  const object1 = parse(file1);
  const object2 = parse(file2);
  expect(genDiff(object1, object2)).toEqual(result1);
});
