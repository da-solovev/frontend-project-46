import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const result1 = readFile('result_stylish.txt');
const result2 = readFile('result_plain.txt');
const result3 = readFile('result_json.txt');

const formats = ['json', 'yaml'];

describe('genDiff', () => {
  test.each(formats)('%s', (format) => {
    const filepath1 = getFixturePath(`file1.${format}`);
    const filepath2 = getFixturePath(`file2.${format}`);
    expect(genDiff(filepath1, filepath2)).toEqual(result1);
    expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(result1);
    expect(genDiff(filepath1, filepath2, 'plain')).toEqual(result2);
    expect(genDiff(filepath1, filepath2, 'json')).toEqual(result3);
  });
});
