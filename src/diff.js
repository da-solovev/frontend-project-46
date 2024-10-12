import _ from 'lodash';
import { isObject } from '../helpers/utils.js';

export const genDiff = (object1, object2) => {
  const allKeys = _.union(Object.keys(object1), Object.keys(object2)).sort();

  const diff = allKeys.reduce((acc, key) => {
    const newAcc = acc;
    if (Object.hasOwn(object1, key) && (Object.hasOwn(object2, key))) {
      // key - находится во всех объектах, value - является объектом во всех ключах
      if (isObject(object1[key]) && isObject(object2[key])) {
        const children = genDiff(object1[key], object2[key]);
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
      //value - оба ключа примитивы
      if (!isObject(object1[key]) && !isObject(object2[key])) {
        const record1 = {
          key, value: object1[key], status: 'deleted', type: 'leaf',
        };
        const record2 = {
          key, value: object2[key], status: 'added', type: 'leaf',
        };
        return newAcc.concat(record1, record2);
      }
      //value - один ключ примитив, другой объект
      //объектом является первый
      if (isObject(object1[key])) { 
        const children = genObject(object1[key]);
        const record1 = {
          key, status: 'deleted', type: 'node', children
        };
        const record2 = {
          key,  value: object2[key], status: 'added', type: 'leaf'
        }
        return newAcc.concat(record1, record2);
      } else { //объектом является второй
        const children = genObject(object2[key]);
        const record1 = {
          key, value: object1[key], status: 'deleted', type: 'leaf'
        };
        const record2 = {
          key, status: 'added', type: 'node', children
        }
        return newAcc.concat(record1, record2);
      }
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
    const isFirstObj = isObject(object1[key]);
    const status = isFirstObj ? 'deleted' : 'added';
    const value = isFirstObj ? object1[key] : object2[key];
    const children = genObject(value);
    const record = {
      key, status, type: 'node', children,
    };
    return newAcc.concat(record);
  }, []);

  return diff;
};

const genObject = (object) => {
  const keys = Object.keys(object);
  return keys.reduce((acc, key) => {
   const newAcc = acc;
   // value - примитив
   if (!isObject(object[key])) {
     const record = { key, value: object[key], type: 'leaf' };
     return newAcc.concat(record);
   }
   // value - объект
   const children = genObject(object[key]);
   const record = { key, type: 'node', children };
   return newAcc.concat(record);
  }, [])
};