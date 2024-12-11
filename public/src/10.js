const DAY10 = 10;
parseData(DAY10, (input) => {
  const timeStringDay10 = `Day ${DAY10}, Total Execution Time`;
  console.time(timeStringDay10);

  const timeStringData1 = `Day ${DAY10}, Data Setup Execution Time`;
  console.time(timeStringData1);
  const map = formatMap(input);
  const sums = getTotalTrailScore(map);
  console.timeEnd(timeStringData1);

  const timeString1 = `Day ${DAY10}, Part 1 Execution Time`;
  console.time(timeString1);
  const part1 = sums.totalScore;
  console.timeEnd(timeString1);

  const timeString2 = `Day ${DAY10}, Part 2 Execution Time`;
  console.time(timeString2);
  const part2 = sums.totalRating;
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

const getTotalTrailScore = ({ map, trailheads }) => {
  return trailheads.reduce((acc, curr) => {
    const { scores, ratings } = buildTrail(map, curr);
    acc.totalScore += scores.size;
    acc.totalRating += ratings.size;
    return acc;
  }, { totalScore: 0, totalRating: 0 });
};

const OFFSETS = {
  up: [-1, 0],
  down: [1, 0],
  left: [0, -1],
  right: [0, 1]
};

const buildTrail = (
  map,
  trailhead,
  row = trailhead[0],
  col = trailhead[1],
  scores = new Set(),
  ratings = new Set(),
  currTrail = `${row},${col}`
) => {
  const currVal = map[row][col];
  if (currVal === 9) {
    scores.add(`${row},${col}`);
    ratings.add(`${currTrail} ${row},${col}`);
    return;
  }

  const nextVal = currVal + 1;
  for (const dir in OFFSETS) {
    const [r, c] = OFFSETS[dir];
    const rowOffset = row - r;
    const colOffset = col - c;
    if (map[rowOffset] && map[rowOffset][colOffset] === nextVal) {
      buildTrail(map, trailhead, rowOffset, colOffset, scores, ratings, `${currTrail} ${row},${col}`);
    }
  }

  return { scores, ratings };
};
