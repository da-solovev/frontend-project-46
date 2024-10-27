import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import parse from '../parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

export const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

export const getParseData = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf-8');
  const fileExt = path.extname(filePath).slice(1);
  const parseData = parse(data, fileExt);
  return parseData;
};
