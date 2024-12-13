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
  const part2 = '';
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

const getCheapestButtonPressCost = ({ a, b, prize }, bigNum) => {
  const xOptions = getAllButtonPresses(a[0], b[0], prize[0]);
  const yOptions = getAllButtonPresses(a[1], b[1], prize[1]);
  const intersection = getIntersection(xOptions, yOptions);
  if (intersection && intersection.length) {
    let currCost = getCost(...intersection[0]);
    intersection.slice(1).forEach(tokens => {
      let cost = getCost(...tokens);
      if (cost < currCost) {
        currCost = cost;
      }
    });
    return currCost;
  } else {
    return 0;
  }
};

const getCost = (a, b) => {
  const tokenACost = 3;
  const tokenBCost = 1;
  return a * tokenACost + b * tokenBCost;
}

const getIntersection = (a, b) => {
  return a.reduce((acc, curr) => {
    b.forEach(comp => {
      if (curr[0] === comp[0] && curr[1] === comp[1]) {
        acc.push(curr);
      }
    });
    return acc;
  }, []);
}

// Ax + By = C
const getAllButtonPresses = (a, b, c) => {
  const CAP = 100;
  if (c === 0 || (a === 0 && b === 0)) {
    return [];
  }

  if (a === 0) {
    return [ [ 0, c / b ] ];
  }
  if (b === 0) {
    return [ [ c / a, 0 ] ];
  }

  let options = [];
  for (let x=0; x <= c && x <= CAP; x++) {
    const y = (c - a * x) / b;
    if (y > 0 && Number.isInteger(y)) {
      options.push([x, y]);
    }
  }

  return options;
}

const getTotalTokenCost = (machines) => {
  return machines.reduce((acc, curr) => acc += getCheapestButtonPressCost(curr), 0);
};
