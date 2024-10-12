import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

export const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

export const isObject = (object) => typeof object === 'object' && object !== null && !Array.isArray(object);