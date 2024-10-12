import _ from 'lodash';

// в утилиты
const isObject = (object) => typeof object === 'object' && object !== null && !Array.isArray(object);

const obj1 = {
  common: {
    setting1: 'Value 1',
    setting2: 200,
    setting3: true,
    setting6: {
      key: 'value',
      doge: {
        wow: '',
      },
    },
  },
  group1: {
    baz: 'bas',
    foo: 'bar',
    nest: {
      key: 'value',
    },
  },
  group2: {
    abc: 12345,
    deep: {
      id: 45,
    },
  },
};

const obj2 = {
  common: {
    follow: false,
    setting1: 'Value 1',
    setting3: null,
    setting4: 'blah blah',
    setting5: {
      key5: 'value5',
    },
    setting6: {
      key: 'value',
      ops: 'vops',
      doge: {
        wow: 'so much',
      },
    },
  },
  group1: {
    foo: 'bar',
    baz: 'bars',
    nest: 'str',
  },
  group3: {
    deep: {
      id: {
        number: 45,
      },
    },
    fee: 100500,
  },
};

const genDiff = (object1, object2) => {
  const allKeys = _.union(Object.keys(object1), Object.keys(object2)).sort();

  const diff = allKeys.reduce((acc, key) => {
    const newAcc = acc;
    if (Object.hasOwn(object1, key) && (Object.hasOwn(object2, key))) {
      // key - находится во всех объектах, value - является объектом во всех ключах
      if (isObject(object1[key]) && isObject(object2[key])) {
        const childrenObject1 = object1[key];
        const childrenObject2 = object2[key];
        const children = genDiff(childrenObject1, childrenObject2);
        const record = {
          key, type: 'node', children,
        };
        return newAcc.concat(record);
      }
      // key - находится во всех объектах, value - совпадают
      if (object1[key] === object2[key]) {
        const record = {
          key, value: object1[key], status: 'default', type: 'leaf',
        };
        return newAcc.concat(record);
      }
      // key - находится во всех объектах, value - различаются
      const record1 = {
        key, value: object1[key], status: 'deleted', type: 'leaf',
      };
      const record2 = {
        key, value: object2[key], status: 'added', type: 'leaf',
      };
      return newAcc.concat(record1, record2);
    }
    // key - отсутствует в одном из объектов, value - оба примитивы
    if (!isObject(object1[key]) && !isObject(object2[key])) {
      const isFirstObj = Object.hasOwn(object1, key);
      const status = isFirstObj ? 'deleted' : 'added';
      const value = isFirstObj ? object1[key] : object2[key];
      const record = {
        key, value, status, type: 'leaf',
      };
      return newAcc.concat(record);
    }
    // key - отсутствует в одном из объектов, value - одно из значений является объектом
    // const isFirstObj = isObject(object1[key]);
    // const status = isFirstObj ? 'deleted' : 'added';
    // const value = isFirstObj ? JSON.stringify(object1[key]) : JSON.stringify(object2[key]);
    // const record = {
    //   key, value, status, type: 'leaf',
    // };
    // return newAcc.concat(record);
    // key - отсутствует в одном из объектов, value - одно из значений является объектом
    const isFirstObj = isObject(object1[key]);
    const status = isFirstObj ? 'deleted' : 'added';
    const value = isFirstObj ? JSON.stringify(object1[key]) : JSON.stringify(object2[key]);
    const record = {
      key, value, status, type: 'leaf',
    };
    return newAcc.concat(record);
  }, []);

  return diff;
};

const fortamStylish = (item, depth) => {
  const space = '    ';

  const displayStatus = ({ status }) => {
    switch (status) {
      case 'added':
        return '+';
      case 'deleted':
        return '-';
      case 'default':
        return ' ';
      default:
        return '';
    }
  };

  if (item.type === 'leaf') {
    const prefix = `${space.repeat(depth).slice(0, -1)}${displayStatus(item)} `;
    console.log(`${prefix}${item.key}: ${item.value}`);
    return;
  }
  console.log(`${space.repeat(depth)}${item.key}: {`);
  const { children } = item;
  children.map((key) => fortamStylish(key, depth + 1));
  console.log(`${space.repeat(depth)}}`);
};

const buildDiff = (diff, format = 'stylish') => {
  console.log('{');

  diff.map((key) => fortamStylish(key, 1));

  console.log('}');
};

const diff = genDiff(obj1, obj2);
console.log(JSON.stringify(diff));
buildDiff(diff);

// сделать функцию которая запишет "обычный" объект в виде дерева в дифф
// type - internal-leaf, internal-node ??

// сделать функцию которая это выведет в виде дерева

const obj = {
  deep: {
    id: {
      number: 45,
    },
  },
  fee: 100500,
};

const genObject = (object) => {
// ??
};
