const DAY4 = 4;
parseData(DAY4, (input) => {
  const timeStringDay4 = `Day ${DAY4}, Total Execution Time`;
  console.time(timeStringDay4);

  const timeStringData1 = `Day ${DAY4}, Data Setup Execution Time`;
  console.time(timeStringData1);
  const wordSearch = formatWordSearch(input);
  console.timeEnd(timeStringData1);

  const timeString1 = `Day ${DAY4}, Part 1 Execution Time`;
  console.time(timeString1);
  const part1 = getXMASCount(wordSearch);
  console.timeEnd(timeString1);

  const timeString2 = `Day ${DAY4}, Part 2 Execution Time`;
  console.time(timeString2);
  const part2 = getMASXCount(wordSearch);
  console.timeEnd(timeString2);

  console.timeEnd(timeStringDay4);
  showAnswers(DAY4, part1, part2);
});

const formatWordSearch = input => {
  return input.reduce((acc, curr) => {
    acc.push(curr.split(''));
    return acc;
  }, []);
};

const getXMASCount = wordSearch => {
  return wordSearch.reduce((acc, row, r) => {
    row.forEach((column, c) => acc += checkIfXMAS(wordSearch, r, c));
    return acc;
  }, 0);
};

const XMASOFFSETS = {
  forward: [ [0, 1], [0, 2], [0, 3] ],
  backward: [ [0, -1], [0, -2], [0, -3] ],
  down: [ [1, 0], [2, 0], [3, 0] ],
  up: [ [-1, 0], [-2, 0], [-3, 0] ],
  downright: [ [1, 1], [2, 2], [3, 3] ],
  downleft: [ [1, -1], [2, -2], [3, -3] ],
  upright: [ [-1, 1], [-2, 2], [-3, 3] ],
  upleft: [ [-1, -1], [-2, -2], [-3, -3] ]
};

const checkIfXMAS = (wordSearch, r, c) => {
  let count = 0;
  if (wordSearch[r][c] === 'X') {
    for (const direction in XMASOFFSETS) {
      if (wordSearch[r + XMASOFFSETS[direction][0][0]] &&
          wordSearch[r + XMASOFFSETS[direction][1][0]] &&
          wordSearch[r + XMASOFFSETS[direction][2][0]] &&
          wordSearch[r + XMASOFFSETS[direction][0][0]][c + XMASOFFSETS[direction][0][1]] === 'M' &&
          wordSearch[r + XMASOFFSETS[direction][1][0]][c + XMASOFFSETS[direction][1][1]] === 'A' &&
          wordSearch[r + XMASOFFSETS[direction][2][0]][c + XMASOFFSETS[direction][2][1]] === 'S'
          ) {
        count++;
      }
    }
  }
  return count;
};

const getMASXCount = wordSearch => {
  return wordSearch.reduce((acc, row, r) => {
    row.forEach((column, c) => acc += checkIfMASX(wordSearch, r, c));
    return acc;
  }, 0);
};

const checkIfMASX = (wordSearch, r, c) => {
  let count = 0;
  if (wordSearch[r][c] === 'A') {
    if (wordSearch[r-1] && wordSearch[r-1][c-1] === 'M' &&
        wordSearch[r+1] && wordSearch[r+1][c+1] === 'S' &&
        wordSearch[r-1] && wordSearch[r-1][c+1] === 'M' &&
        wordSearch[r+1] && wordSearch[r+1][c-1] === 'S'
      ) count++;
    if (wordSearch[r-1] && wordSearch[r-1][c-1] === 'S' &&
        wordSearch[r+1] && wordSearch[r+1][c+1] === 'M' &&
        wordSearch[r-1] && wordSearch[r-1][c+1] === 'S' &&
        wordSearch[r+1] && wordSearch[r+1][c-1] === 'M'
      ) count++;
    if (wordSearch[r-1] && wordSearch[r-1][c-1] === 'M' &&
        wordSearch[r+1] && wordSearch[r+1][c+1] === 'S' &&
        wordSearch[r-1] && wordSearch[r-1][c+1] === 'S' &&
        wordSearch[r+1] && wordSearch[r+1][c-1] === 'M'
      ) count++;
    if (wordSearch[r-1] && wordSearch[r-1][c-1] === 'S' &&
        wordSearch[r+1] && wordSearch[r+1][c+1] === 'M' &&
        wordSearch[r-1] && wordSearch[r-1][c+1] === 'M' &&
        wordSearch[r+1] && wordSearch[r+1][c-1] === 'S'
      ) count++;
  }
  return count;
};
