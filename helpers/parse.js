import { readFileSync } from 'fs';

export const parseToJSON = (path) => {
  const file = readFileSync(path, 'utf8');
  const fileToJSON = JSON.parse(file);
  
  return fileToJSON;
}