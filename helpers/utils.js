import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import parse from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

export const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

export const isObject = (object) => typeof object === 'object' && object !== null && !Array.isArray(object);

export const getParseData = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf-8');
  const fileExt = path.extname(filePath);
  const parseData = parse(data, fileExt);
  return parseData;
};
