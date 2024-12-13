const DAY13 = 13;
parseData(DAY13, (input) => {
  const timeStringDay13 = `Day ${DAY13}, Total Execution Time`;
  console.time(timeStringDay13);

  const timeStringData1 = `Day ${DAY13}, Data Setup Execution Time`;
  console.time(timeStringData1);
  const machines = formatMachines(input);
  console.timeEnd(timeStringData1);

  const timeString1 = `Day ${DAY13}, Part 1 Execution Time`;
  console.time(timeString1);
  const part1 = getTotalTokenCost(machines);
  console.timeEnd(timeString1);

  const timeString2 = `Day ${DAY13}, Part 2 Execution Time`;
  console.time(timeString2);
  const part2 = getTotalTokenCost(machines, 10000000000000);
  console.timeEnd(timeString2);

  console.timeEnd(timeStringDay13);
  showAnswers(DAY13, part1, part2);
});

const formatMachines = input => {
  return input.reduce((acc, curr, index) => {
    if (curr !== '') {
      const arr = curr.split(' ');
      if (arr[0] === 'Prize:') {
        Object.defineProperty(
          acc[acc.length - 1],
          'prize',
          { value: [ parseInt(arr[1].match(/\d+/g)), parseInt(arr[2].match(/\d+/g)) ] }
        );
      } else {
        Object.defineProperty(
          acc[acc.length - 1],
          arr[1].charAt(0).toLowerCase(),
          { value: [ parseInt(arr[2].match(/\d+/g)), parseInt(arr[3].match(/\d+/g)) ] }
        );
      }
    } else if (index < input.length - 1) {
      acc.push({});
    }
    return acc;
  }, [ {} ]);
};

const getCost = (a, b) => {
  const tokenACost = 3;
  const tokenBCost = 1;
  return a * tokenACost + b * tokenBCost;
}

const getTotalTokenCost = (machines, offset) => {
  return machines.reduce((acc, curr) => acc += getLineIntersections(curr, offset), 0);
};

const getLineIntersections = ({ a, b, prize }, offset = 0) => {
  // Math Help: https://www.youtube.com/watch?v=-5J-DAsWuJc
  const aCount =
    ((prize[0] + offset) * b[1] - (prize[1] + offset) * b[0]) / (a[0] * b[1] - a[1] * b[0]);
  const bCount =
    ((prize[0] + offset) - a[0] * aCount) / b[0];

  if (Number.isInteger(aCount) && Number.isInteger(bCount)) {
    return getCost(aCount, bCount);
  }

  return 0;
}
