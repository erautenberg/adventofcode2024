const DAY15 = 15;
parseData(DAY15, (input) => {
  const timeStringDay15 = `Day ${DAY15}, Total Execution Time`;
  console.time(timeStringDay15);

  const timeStringData1 = `Day ${DAY15}, Data Setup Execution Time`;
  console.time(timeStringData1);
  const info = formatWarehouse(input);
  console.timeEnd(timeStringData1);

  const timeString1 = `Day ${DAY15}, Part 1 Execution Time`;
  console.time(timeString1);
  const part1 = getTotalGPSCoords(info);
  console.timeEnd(timeString1);

  const timeString2 = `Day ${DAY15}, Part 2 Execution Time`;
  console.time(timeString2);
  const part2 = '';
  console.timeEnd(timeString2);

  console.timeEnd(timeStringDay15);
  showAnswers(DAY15, part1, part2);
});

const formatWarehouse = input => {
  let moves = false;
  return input.reduce((acc, curr, r) => {
    if (moves) {
      acc.moves.push(...curr.split(''));
    } else if (curr === '') {
      moves = true;
    } else {
      const newRow = curr.split('');
      acc.warehouse.push(newRow);

      const c = newRow.indexOf('@');
      if (c > -1) {
        acc.start = { r, c };
      }
    }

    return acc;
  }, { warehouse: [], moves: [], start: {} });
}

const MOVES = {
  '^': [-1, 0], // up
  'v': [1, 0], // down
  '<': [0, -1], // left
  '>': [0, 1] // right
}

const makeMoves = ({ warehouse, moves, start }) => {
  let rRobot = start.r;
  let cRobot = start.c;

  let rOffset, cOffset, rNext, cNext, next

  moves.forEach(move => {
    [ rOffset, cOffset ] = MOVES[move];
    rNext = rRobot + rOffset;
    cNext = cRobot + cOffset;
    next = warehouse[rNext] && warehouse[rNext][cNext];

    if (next && next !== '#') {
      if (next === '.') {
        warehouse[rRobot][cRobot] = '.';
        rRobot += rOffset;
        cRobot += cOffset;
        warehouse[rRobot][cRobot] = '@';
      } else if (next === 'O') {
        do {
          rNext += rOffset;
          cNext += cOffset;
        } while (warehouse[rNext][cNext] === 'O');
        if (warehouse[rNext][cNext] !== '#') {
          warehouse[rRobot][cRobot] = '.';
          rRobot += rOffset;
          cRobot += cOffset;
          warehouse[rRobot][cRobot] = '@';
          warehouse[rRobot + rOffset][cRobot + cOffset] = 'O';
          warehouse[rNext][cNext] = 'O';
        }
      }
    }
  });

  return warehouse;
}

const printWarehouse = warehouse => {
  console.log(warehouse.reduce((acc, curr) => acc += curr.join('') + '\n', ''));
}

const getGPSCoord = (row, col) => {
  return 100 * row + col;
};

const getTotalGPSCoords = info => {
  return makeMoves(info).reduce((acc, curr, row) => {
    curr.forEach((char, col) => {
      if (char === 'O') {
        acc += getGPSCoord(row, col);
      }
    });
    return acc;
  }, 0);
}
