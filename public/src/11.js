const DAY11 = 11;
parseData(DAY11, (input) => {
  const timeStringDay11 = `Day ${DAY11}, Total Execution Time`;
  console.time(timeStringDay11);

  const timeStringData1 = `Day ${DAY11}, Data Setup Execution Time`;
  console.time(timeStringData1);
  const stones = formatStones(input[0]);
  console.timeEnd(timeStringData1);

  const timeString1 = `Day ${DAY11}, Part 1 Execution Time`;
  console.time(timeString1);
  const part1 = applyBlinks(stones, 25).length;
  console.timeEnd(timeString1);

  const timeString2 = `Day ${DAY11}, Part 2 Execution Time`;
  console.time(timeString2);
  const part2 = '';
  console.timeEnd(timeString2);

  console.timeEnd(timeStringDay11);
  showAnswers(DAY11, part1, part2);
});

const formatStones = input => {
  return input.split(' ').map(n => parseInt(n));
}

const applyRules = stones => {
  return stones.reduce((acc, curr) => {
    if (curr === 0) {
      acc.push(1);
    } else {
      const currStr = curr.toString();
      if (currStr.length % 2 === 0) {
        const s1 = currStr.slice(0, currStr.length / 2);
        const s2 = currStr.slice(currStr.length / 2, currStr.length);
        acc.push(parseInt(s1), parseInt(s2));
      }
      else {
        acc.push(curr * 2024);
      }
    }
    return acc;
  }, []);
};

const applyBlinks = (stones, blinks) => {
  let newStones = [...stones];
  for (let i=1; i<=blinks; i++) {
    newStones = applyRules(newStones);
  }
  return newStones;
}
