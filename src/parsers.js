import yaml from 'js-yaml';

const parse = (data, fileExt) => {
  if (fileExt === 'json') {
    return JSON.parse(data);
  }
  if (['yaml', 'yml'].includes(fileExt)) {
    return yaml.load(data);
  }
  throw new Error(`File extension '${fileExt}' not supported`);
};
export default parse;
