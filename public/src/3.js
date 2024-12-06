const DAY3 = 3;
parseData(DAY3, (input) => {
  const timeStringDay3 = `Day ${DAY3}, Total Execution Time`;
  console.time(timeStringDay3);

  const timeStringData1 = `Day ${DAY3}, Data Setup Execution Time`;
  console.time(timeStringData1);
  const formattedInstructions = formatInstructions(input);
  console.timeEnd(timeStringData1);

  const timeString1 = `Day ${DAY3}, Part 1 Execution Time`;
  console.time(timeString1);
  const part1 = getSumOfMultipliedInstructions(formattedInstructions);
  console.timeEnd(timeString1);

  const timeString2 = `Day ${DAY3}, Part 2 Execution Time`;
  console.time(timeString2);
  const part2 = '';
  console.timeEnd(timeString2);

  console.timeEnd(timeStringDay3);
  showAnswers(DAY3, part1, part2);
});

const formatInstructions = input => {
  return input.reduce((instructions, line) => {
    line.matchAll(/mul\((\d{1,3}),(\d{1,3}\))/g).reduce((acc, curr) =>
      instructions.push([parseInt(curr[1]), parseInt(curr[2])]),
    []);
    return instructions;
  }, []);
};

const getSumOfMultipliedInstructions = instructions => {
  return instructions.reduce((acc, curr) => acc += (curr[0] * curr[1]), 0);
};
