const fortamStylish = (item, depth) => {
    const space = '    ';
  
    const displayStatus = ({ status }) => {
      switch (status) {
        case 'added':
          return '+';
        case 'deleted':
          return '-';
        default:
          return ' ';
      }
    };
  
    const prefix = `${space.repeat(depth).slice(0, -2)}${displayStatus(item)} `;

    if (item.type === 'leaf') {
      console.log(`${prefix}${item.key}: ${item.value}`);
      return;
    }
    console.log(`${prefix}${item.key}: {`);
    const { children } = item;
    children.map((key) => fortamStylish(key, depth + 1));
    console.log(`${space.repeat(depth)}}`);
};

export const buildDiff = (diff, format = 'stylish') => {
  console.log('{');

  diff.map((key) => fortamStylish(key, 1));

  console.log('}');
};