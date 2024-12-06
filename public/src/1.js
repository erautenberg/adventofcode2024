const DAY1 = 1;
parseData(DAY1, (input) => {
  const timeStringDay1 = `Day ${DAY1}, Total Execution Time`;
  console.time(timeStringDay1);

  const timeStringData1 = `Day ${DAY1}, Data Setup Execution Time`;
  console.time(timeStringData1);
  const formatedInput = sortLists(formatLists(input));
  console.timeEnd(timeStringData1);

  const timeString1 = `Day ${DAY1}, Part 1 Execution Time`;
  console.time(timeString1);
  const part1 = getDistanceSum(getDistances(formatedInput));
  console.timeEnd(timeString1);

  const timeString2 = `Day ${DAY1}, Part 2 Execution Time`;
  console.time(timeString2);
  const part2 = getSimilarityScore(formatedInput);
  console.timeEnd(timeString2);

  console.timeEnd(timeStringDay1);
  showAnswers(DAY1, part1, part2);
});

const formatLists = input => {
  return input.reduce((acc, curr) => {
    const [ , a, b] = curr.match(/(\d+)\s*?(\d+)/);
    acc[0].push(parseInt(a));
    acc[1].push(parseInt(b));
    return acc;
  }, [ [], [] ]);
};

const sortLists = lists => {
  return [ lists[0].toSorted(), lists[1].toSorted()];
};

const getDistance = (a, b) => {
  return Math.abs(a - b);
}

const getDistances = lists => {
  return distances = lists[0].reduce((acc, curr, index) => {
    acc.push(getDistance(curr, lists[1][index]));
    return acc;
  }, []);
}

const getDistanceSum = distances => {
  return distances.reduce((acc, curr) => acc += curr, 0);
};

const countOccurrences = list => {
  const counts = new Map();
  for (const num of list) {
    counts.has(num) ?
      counts.set(num, counts.get(num) + 1) :
      counts.set(num, 1);
  }
  return counts;
}

const getSimilarityScore = lists => {
  const counts = countOccurrences(lists[1]);
  return lists[0].reduce((acc, curr) =>
    acc += (curr * counts.get(curr) || 0),
  0);
}
