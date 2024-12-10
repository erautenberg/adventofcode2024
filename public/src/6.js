const DAY6 = 6;
parseData(DAY6, (input) => {
  const timeStringDay6 = `Day ${DAY6}, Total Execution Time`;
  console.time(timeStringDay6);

  const timeStringData1 = `Day ${DAY6}, Data Setup Execution Time`;
  console.time(timeStringData1);
  const labMap = formatMap(input);
  console.timeEnd(timeStringData1);

  const timeString1 = `Day ${DAY6}, Part 1 Execution Time`;
  console.time(timeString1);
  const guardLocations = findGuardPath(labMap);
  const part1 = guardLocations.size;
  console.timeEnd(timeString1);

  const timeString2 = `Day ${DAY6}, Part 2 Execution Time`;
  console.time(timeString2);
  const part2 = findObstacles(labMap, guardLocations);
  console.timeEnd(timeString2);

  console.timeEnd(timeStringDay6);
  showAnswers(DAY6, part1, part2);
});

const formatMap = input => {
  return input.reduce((acc, curr, row) => {
    const column = curr.indexOf('^');
    if (column !== -1) {
      acc.guardstart = [row, column];
    }
    acc.map.push(curr.split(''));
    return acc;
  }, { map: [], guardstart: null });
};

const findGuardPath = ({ map, guardstart }) => {
  const rMax = map.length;
  const cMax = map[0].length;
  let dir = 1; // 1 = North, 2 = East, 3 = South, 4 = West

  let guardPath = new Set();
  let [ rGuard, cGuard ] = guardstart;

  while (rGuard >= 0 && rGuard < rMax && cGuard >= 0 && cGuard < cMax) {
    let changeDir = false;
    guardPath.add(`${rGuard},${cGuard}`);

    if (dir === 1 && map[rGuard - 1]) {
      map[rGuard - 1][cGuard] !== '#' ? rGuard-- : changeDir = true;
    } else if (dir === 2 && map[rGuard]) {
      map[rGuard][cGuard + 1] !== '#' ? cGuard++ : changeDir = true;
    } else if (dir === 3 && map[rGuard + 1]) {
      map[rGuard + 1][cGuard] !== '#' ? rGuard++ : changeDir = true;
    } else if (dir === 4 && map[rGuard]) {
      map[rGuard][cGuard - 1] !== '#' ? cGuard-- : changeDir = true;
    } else {
      break; // otherwise, going off map, so break loop
    }

    if (changeDir) {
      dir = dir === 4 ? 1 : dir + 1;
    }
  }

  return guardPath;
};

const findObstacles = ({ map, guardstart }, guardLocations) => {
  return map.reduce((acc, curr, r) => {
    for (let c=0; c < curr.length; c++) {
      if (guardLocations.has(`${r},${c}`) && map[r][c] !== '#') {
        map[r][c] = '#';
        findGuardLoop({ map, guardstart }) && acc++;
        map[r][c] = '.';
      }
    }
    return acc;
  }, 0);
};

const findGuardLoop = ({ map, guardstart }) => {
  const rMax = map.length;
  const cMax = map[0].length;
  let dir = 1; // 1 = North, 2 = East, 3 = South, 4 = West

  let guardPath = new Set();
  let [ rGuard, cGuard ] = guardstart;

  while (rGuard >= 0 && rGuard < rMax && cGuard >= 0 && cGuard < cMax) {
    const newLocation = `${rGuard},${cGuard},${dir}`;
    if (guardPath.has(newLocation)) {
      return true;
    }

    let changeDir = false;
    guardPath.add(newLocation);

    if (dir === 1 && map[rGuard - 1]) {
      map[rGuard - 1][cGuard] !== '#' ? rGuard-- : changeDir = true;
    } else if (dir === 2 && map[rGuard]) {
      map[rGuard][cGuard + 1] !== '#' ? cGuard++ : changeDir = true;
    } else if (dir === 3 && map[rGuard + 1]) {
      map[rGuard + 1][cGuard] !== '#' ? rGuard++ : changeDir = true;
    } else if (dir === 4 && map[rGuard]) {
      map[rGuard][cGuard - 1] !== '#' ? cGuard-- : changeDir = true;
    } else {
      break; // otherwise, going off map, so break loop
    }

    if (changeDir) {
      dir = dir === 4 ? 1 : dir + 1;
    }
  }
  return false;
};

