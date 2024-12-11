const DAY10 = 10;
parseData(DAY10, (input) => {
  const timeStringDay10 = `Day ${DAY10}, Total Execution Time`;
  console.time(timeStringDay10);

  const timeStringData1 = `Day ${DAY10}, Data Setup Execution Time`;
  console.time(timeStringData1);
  const map = formatMap(input);
  console.timeEnd(timeStringData1);

  const timeString1 = `Day ${DAY10}, Part 1 Execution Time`;
  console.time(timeString1);
  const part1 = getTotalTrailScore(map);
  console.timeEnd(timeString1);

  const timeString2 = `Day ${DAY10}, Part 2 Execution Time`;
  console.time(timeString2);
  const part2 = '';
  console.timeEnd(timeString2);

  console.timeEnd(timeStringDay10);
  showAnswers(DAY10, part1, part2);
});

const formatMap = input => {
  return input.reduce((acc, curr, row) => {
    acc.map.push(curr.split('').map((h, col) => {
      if (h === '0') {
        acc.trailheads.push([row, col]);
      }
      return parseInt(h);
    }));
    return acc;
  }, { trailheads: [], map: [] });
};

const OFFSETS = {
  up: [-1, 0],
  down: [1, 0],
  left: [0, -1],
  right: [0, 1]
};

const getTotalTrailScore = ({ map, trailheads }) => {
  return trailheads.reduce((acc, curr) => acc += buildTrail(map, curr).size, 0);
};

const buildTrail = (map, trailhead, row = trailhead[0], col = trailhead[1], allTrails = new Set()) => {
  const currVal = map[row][col];
  if (currVal === 9) {
    allTrails.add(`${row},${col}`);
    return;
  }

  const nextVal = currVal + 1;
  for (const dir in OFFSETS) {
    const [r, c] = OFFSETS[dir];
    const rowOffset = row - r;
    const colOffset = col - c;
    if (map[rowOffset] && map[rowOffset][colOffset] === nextVal) {
      buildTrail(map, trailhead, rowOffset, colOffset, allTrails);
    }
  }

  return allTrails;
};
