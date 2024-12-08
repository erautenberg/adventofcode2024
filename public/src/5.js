const DAY5 = 5;
parseData(DAY5, (input) => {
  const timeStringDay5 = `Day ${DAY5}, Total Execution Time`;
  console.time(timeStringDay5);

  const timeStringData1 = `Day ${DAY5}, Data Setup Execution Time`;
  console.time(timeStringData1);
  const pages = separateUpdates(formatPages(input));
  console.timeEnd(timeStringData1);

  const timeString1 = `Day ${DAY5}, Part 1 Execution Time`;
  console.time(timeString1);
  const part1 = getMiddleNumberSum(pages.correct);
  console.timeEnd(timeString1);

  const timeString2 = `Day ${DAY5}, Part 2 Execution Time`;
  console.time(timeString2);
  const part2 = getMiddleNumberSum(fixOrders(pages.pageOrders, pages.incorrect));
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

const separateUpdates = ( { pageOrders, updates }) => {
  return updates.reduce((acc, curr) => {
    let isCorrect = true;
    for (let i=1; i < curr.length; i++) {
      let orders = pageOrders.get(curr[i]);
      if (orders && orders.length) {
        const prevPages = curr.slice(0, i).filter(page => orders.includes(page));
        if (prevPages.length) {
          isCorrect = false;
          break;
        }
      }
    }
    isCorrect ? acc.correct.push(curr) : acc.incorrect.push(curr);
    return acc;
  }, { pageOrders, correct: [], incorrect: []});
};

const getMiddleNumberSum = updates => {
  return updates.reduce((acc, curr) => acc += curr[Math.floor(curr.length / 2)], 0);
};

const fixOrders = (pageOrders, updates) => {
  return updates.map(pages => fixOrder(pageOrders, pages, 1));
};

const fixOrder = (pageOrders, pages, i) => {
  if (i == pages.length) return pages;

  const orders = pageOrders.get(pages[i]);
  if (orders) {
    const prevPages = pages.slice(0, i).filter(page => orders.includes(page));
    if (prevPages.length) {
      const prevPageIndex = pages.indexOf(prevPages[0]);
      const newPageOrder = [
        ...pages.slice(0, prevPageIndex), // beginning to first "mistake"
        pages[i], // page that needs to move up
        pages[prevPageIndex], // page that needs to move down ("mistake")
        ...pages.slice(prevPageIndex+1, i), // pages between "mistake" & page that needs to move up
        ...pages.slice(i+1) // pages after the page that needs to move up
      ];

      return fixOrder(pageOrders, newPageOrder, 1);
    }
  }

  return fixOrder(pageOrders, pages, ++i);
}
