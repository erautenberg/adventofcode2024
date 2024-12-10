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
  const part2 = sumAllValidEquations(equations, '+*|');
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

const sumAllValidEquations = (equations, operators = '+*') => {
  return equations.reduce((acc, curr) => checkIfValidOperators(curr, operators) ? acc += curr[0] : acc, 0);
};

const checkIfValidOperators = (equation, operators) => {
  const length = equation.length - 2;
  const operatorKey = `${operators},${length}`;
  if (!COMBOS.has(operatorKey)) {
    getAllCombos(operators, length, length);
  }

  return COMBOS.get(operatorKey).some(combo => {
    const result = equation.slice(1).reduce((acc, curr, i) => {
      if (i === 0) {
        acc = curr;
      } else {
        switch (combo.charAt(i - 1)) {
          case '+':
            acc += curr;
            break;
          case '*':
            acc *= curr;
            break;
          case '|':
            acc = parseInt(`${acc}${curr}`);
        }
      }
      return acc;
    }, 0);
    return result === equation[0];
  });
};

const COMBOS = new Map();

const getAllCombos = (operators, orignalLength, length, prefix = '') => {
  if (length == 0)  {
    const operatorKey = `${operators},${orignalLength}`;
    COMBOS.get(operatorKey) ? COMBOS.get(operatorKey).push(prefix) : COMBOS.set(operatorKey, [prefix]);
    return;
  }
  for (let i = 0; i < operators.length; ++i) {
    getAllCombos(operators, orignalLength, length - 1, prefix + operators[i]);
  }
}
