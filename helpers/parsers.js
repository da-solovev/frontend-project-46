import yaml from 'js-yaml';
import path from 'path';

export const parseJSON = (str) => JSON.parse(str);

export const parseYaml = (str) => yaml.load(str);

export const getParser = (filepath) => {
  const fileExt = path.extname(filepath);
  if (fileExt === '.json') {
    return parseJSON;
  }
  if (['.yaml', '.yml'].includes(fileExt)) {
    return parseYaml;
  }
};
