import _ from 'lodash';

export const genDiff = (object1, object2) => {
  const allKeys = _.union(Object.keys(object1), Object.keys(object2)).sort();

  const diff = allKeys.reduce((acc, key) => {
    const newAcc = acc;
    if (Object.hasOwn(object1, key) && (Object.hasOwn(object2, key))) {
      if (object1[key] === object2[key]) {
        // key и value совпадают в обоих объектах
        const record = { key, value: object1[key], mark: ' ' };
        return newAcc.concat(record);
      }
      // key совпадают в обоих объектах, value разные
      const record1 = { key, value: object1[key], mark: '-' };
      const record2 = { key, value: object2[key], mark: '+' };
      return newAcc.concat(record1, record2);
    }
    // key отсутствует в одном из объектов
    const isFirstObj = Object.hasOwn(object1, key);
    const mark = isFirstObj ? '-' : '+';
    const value = isFirstObj ? object1[key] : object2[key];
    const record = { key, value, mark };
    return newAcc.concat(record);
  }, []);

  const text = `{\n${diff.map((record) => `  ${record.mark} ${record.key}: ${record.value}`).join('\n')}\n}`;
  return text;
};

export default genDiff;
