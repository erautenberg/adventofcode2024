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
  const part1 = getTotalStoneCount(stones, 25);
  console.timeEnd(timeString1);

  const timeString2 = `Day ${DAY11}, Part 2 Execution Time`;
  console.time(timeString2);
  const part2 = getTotalStoneCount(stones, 75);
  console.timeEnd(timeString2);

  console.timeEnd(timeStringDay11);
  showAnswers(DAY11, part1, part2);
});

const formatStones = input => {
  return input.split(' ').map(n => parseInt(n));
}

const getTotalStoneCount = (stones, blinks) => {
  return stones.reduce((acc, curr) => acc += getStoneCount(curr, blinks), 0);
}

const getStoneCount = (stone, blinks, stoneMap = new Map()) => {
  const stoneKey = `${stone},${blinks}`;
  if (stoneMap.get(stoneKey)) {
    return stoneMap.get(stoneKey);
  }

  if (blinks === 0) {
    count = 1;
  } else if (stone === 0) {
    count = getStoneCount(1, blinks - 1, stoneMap);
  } else {
    const stoneStr = stone.toString();
    if (stoneStr.length % 2 === 0) {
      const s1 = stoneStr.slice(0, stoneStr.length / 2);
      const s2 = stoneStr.slice(stoneStr.length / 2, stoneStr.length);
      count = getStoneCount(parseInt(s1), blinks - 1, stoneMap) +
              getStoneCount(parseInt(s2), blinks - 1, stoneMap);
    }
    else {
      count = getStoneCount(stone * 2024, blinks - 1, stoneMap);
    }
  }

  stoneMap.set(stoneKey, count);
  return count;
};
