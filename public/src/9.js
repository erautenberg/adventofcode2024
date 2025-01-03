const DAY9 = 9;
parseData(DAY9, (input) => {
  const timeStringDay9 = `Day ${DAY9}, Total Execution Time`;
  console.time(timeStringDay9);

  const timeStringData1 = `Day ${DAY9}, Data Setup Execution Time`;
  console.time(timeStringData1);
  const diskMap = formatMap(input[0]);
  console.timeEnd(timeStringData1);

  const timeString1 = `Day ${DAY9}, Part 1 Execution Time`;
  console.time(timeString1);
  const part1 = getCheckSum(moveFiles(diskMap));
  console.timeEnd(timeString1);

  const timeString2 = `Day ${DAY9}, Part 2 Execution Time`;
  console.time(timeString2);
  const part2 = getCheckSum(moveWholeFiles(diskMap));
  console.timeEnd(timeString2);

  console.timeEnd(timeStringDay9);
  showAnswers(DAY9, part1, part2);
});

const formatMap = input => {
  let id = 0;
  return input.split('').reduce((acc, curr, index) => {
    if (index % 2 === 0) {
      acc.map.push(...Array(parseInt(curr)).fill(id));
      acc.fileSizes.set(id, parseInt(curr));
      id++;
    } else {
      acc.map.push(...Array(parseInt(curr)).fill(null));
    }
    return acc;
  }, { map: [], fileSizes: new Map() });
};

const moveFiles = ({ map }) => {
  const newMap = [...map];
  for (let i=map.length-1; i>0; i--) {
    if (map[i] === null) {
      continue;
    } else {
      const freeSpace = newMap.indexOf(null);
      if (freeSpace < i) {
        newMap[freeSpace] = map[i];
        newMap[i] = null;
      }
    }
  }
  return newMap;
};

const getCheckSum = map => {
  return map.reduce((acc, curr, index) => acc += (index * curr), 0);
};

const moveWholeFiles = ({ map, fileSizes }) => {
  const newMap = [...map];
  for (let i=map.length-1; i>0; i--) {
    const value = map[i];
    if (value !== null) {
      const size = fileSizes.get(value);
      const freeSpace = getIndexOfSequence(newMap, null, size);
      if (freeSpace < i && freeSpace > -1) {
        newMap.splice(freeSpace, size, ...Array(size).fill(value));
        newMap.splice(i - size + 1, size, ...Array(size).fill(null));
        i -= (size - 1);
      }
    }
  }
  return newMap;
};

const getIndexOfSequence = (arr, value, size) => {
  for (let i=0; i<arr.length - size; i++) {
    let found = true;
    for (let j=0; j<size; j++) {
      if (arr[i+j] !== value) {
        found = false;
        break;
      }
    }
    if (found) {
      return i;
    }
  }
  return -1;
};
