const DAY7 = 7;
parseData(DAY7, (input) => {
  const timeStringDay7 = `Day ${DAY7}, Total Execution Time`;
  console.time(timeStringDay7);

  const timeStringData1 = `Day ${DAY7}, Data Setup Execution Time`;
  console.time(timeStringData1);
  const equations = formatEquations(input);
  console.timeEnd(timeStringData1);

  const timeString1 = `Day ${DAY7}, Part 1 Execution Time`;
  console.time(timeString1);
  const part1 = sumAllValidEquations(equations);
  console.timeEnd(timeString1);

  const timeString2 = `Day ${DAY7}, Part 2 Execution Time`;
  console.time(timeString2);
  const part2 = '';
  console.timeEnd(timeString2);

  console.timeEnd(timeStringDay7);
  showAnswers(DAY7, part1, part2);
});

const formatEquations = input => {
  return input.reduce((acc, curr) => {
    acc.push(curr.match(/\d+/g).map(n => parseInt(n)));
    return acc;
  }, []);
};

const sumAllValidEquations = equations => {
  return equations.reduce((acc, curr) => checkIfValidOperators(curr) ? acc += curr[0] : acc, 0);
};

const checkIfValidOperators = equation => {
  return getAllCombos('*+', equation.length - 2).some(operators => {
    const result = equation.slice(1).reduce((acc, curr, i) => {
      if (i === 0) {
        acc = curr;
      } else {
        switch (operators.charAt(i - 1)) {
          case '+':
            acc += curr;
            break;
          case '*':
            acc *= curr;
            break;
        }
      }
      return acc;
    }, 0);
    return result === equation[0];
  });
};

const getAllCombos = (operators, length, combos = [], prefix = '') => {
  if (length == 0)  {
    combos.push(prefix);
    return;
  }
  for (let i = 0; i < operators.length; ++i) {
    getAllCombos(operators, length - 1, combos, prefix + operators[i]);
  }
  return combos;
}
