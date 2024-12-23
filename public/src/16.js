const DAY16 = 16;
parseData(DAY16, (input) => {
  const timeStringDay16 = `Day ${DAY16}, Total Execution Time`;
  console.time(timeStringDay16);

  const timeStringData1 = `Day ${DAY16}, Data Setup Execution Time`;
  console.time(timeStringData1);
  const formattedMaze = formatMaze(input);
  console.log(formattedMaze);
  console.timeEnd(timeStringData1);

  const timeString1 = `Day ${DAY16}, Part 1 Execution Time`;
  console.time(timeString1);
  const part1 = getCheapestPath(formattedMaze);
  console.timeEnd(timeString1);

  const timeString2 = `Day ${DAY16}, Part 2 Execution Time`;
  console.time(timeString2);
  const part2 = '';
  console.timeEnd(timeString2);

  console.timeEnd(timeStringDay16);
  showAnswers(DAY16, part1, part2);
});

const formatMaze = input => {
  return input.reduce((acc, curr, row) => {
    const line = curr.split('');
    const start = line.indexOf('S');
    const end = line.indexOf('E');
    if (start > -1) {
      acc.start = [ row, start ];
    }
    if (end > -1) {
      acc.end = [ row, end ];
    }
    acc.maze.push(line);
    return acc;
  }, { maze: [], start: [], end: [] } );
};

const OFFSETS = {
  up: [-1, 0],
  down: [1, 0],
  left: [0, -1],
  right: [0, 1]
};

const getClockwiseDir = dir => {
  switch (dir) {
    case 'up':
      return 'right';
    case 'right':
      return 'down';
    case 'down':
      return 'left';
    case 'left':
      return 'up';
  };
}

const getCounterClockwiseDir = dir => {
  switch (dir) {
    case 'up':
      return 'left';
    case 'left':
      return 'down';
    case 'down':
      return 'right';
    case 'right':
      return 'up';
  };
}

const getCheapestPath = ({ maze, start, end }, startDir = 'right') => {
  const costs = [ [0, start[0], start[1], startDir] ];
  const visited = new Set([`${start[0]},${start[1]},${startDir}`]);

  while (costs.length) {
    const [ cost, row, col, dir ] = costs.pop();

    if (row === end[0] && col === end[1]) {
      return cost;
    }

    visited.add(`${row},${col},${dir}`);

    const [ rOffset, cOffset ] = OFFSETS[dir];
    const options = [
      [ cost + 1, row + rOffset, col + cOffset, dir ], // forward
      [ cost + 1000, row, col, getClockwiseDir(dir) ], // turn clockwise
      [ cost + 1000, row, col, getCounterClockwiseDir(dir) ] // turn counterclockwise
    ];

    for (const [ costNext, rNext, cNext, dirNext ] of options) {
      if (maze[rNext][cNext] !== '#' && !visited.has(`${rNext},${cNext},${dirNext}`)) {
        costs.push([ costNext, rNext, cNext, dirNext ]);
        // sort costs from largest to smallest cost so "pop" in next loop yileds next smallest cost
        costs.sort((a, b) => b[0] - a[0]);
      }
    }
  }
};
