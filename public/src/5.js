const DAY5 = 5;
parseData(DAY5, (input) => {
  const timeStringDay5 = `Day ${DAY5}, Total Execution Time`;
  console.time(timeStringDay5);

  const timeStringData1 = `Day ${DAY5}, Data Setup Execution Time`;
  console.time(timeStringData1);
  const pages = formatPages(input);
  console.timeEnd(timeStringData1);

  const timeString1 = `Day ${DAY5}, Part 1 Execution Time`;
  console.time(timeString1);
  const part1 = getMiddleNumberSum(checkUpdates(pages));
  console.timeEnd(timeString1);

  const timeString2 = `Day ${DAY5}, Part 2 Execution Time`;
  console.time(timeString2);
  const part2 = '';
  console.timeEnd(timeString2);

  console.timeEnd(timeStringDay5);
  showAnswers(DAY5, part1, part2);
});

const formatPages = input => {
  let pageOrders = true;
  return input.reduce((acc, curr) => {
    if (curr === '') {
      pageOrders = false;
    } else if (pageOrders) {
      let [ a, b ] = curr.split('|').map(n => parseInt(n));
      acc.pageOrders.get(a) ?
        acc.pageOrders.get(a).push(b) :
        acc.pageOrders.set(a, [ b ]);
    } else {
      acc.updates.push(curr.split(',').map(n => parseInt(n)));
    }
    return acc;
  }, { pageOrders: new Map(), updates: []});
};

const checkUpdates = ( { pageOrders, updates }) => {
  return updates.reduce((acc, curr) => {
    let isCorrect = true;
    for (let i=1; i < curr.length; i++) {
      let orders = pageOrders.get(curr[i]);
      if (orders && orders.length) {
        const containsPrevPage = curr.slice(0, i).filter(page => orders.includes(page));
        if (containsPrevPage.length) {
          isCorrect = false;
          break;
        }
      }
    }
    isCorrect && acc.push(curr);
    return acc;
  }, []);
};

const getMiddleNumberSum = updates => {
  return updates.reduce((acc, curr) => acc += curr[Math.floor(curr.length / 2)], 0);
};
