const DAY2 = 2;
parseData(DAY2, (input) => {
  const timeStringDay2 = `Day ${DAY2}, Total Execution Time`;
  console.time(timeStringDay2);

  const timeStringData1 = `Day ${DAY2}, Data Setup Execution Time`;
  console.time(timeStringData1);
  const formattedReports = formatReports(input);
  console.timeEnd(timeStringData1);

  const timeString1 = `Day ${DAY2}, Part 1 Execution Time`;
  console.time(timeString1);
  const part1 = getSafetyReport(formattedReports, 1, 3).filter(Boolean).length;
  console.timeEnd(timeString1);

  const timeString2 = `Day ${DAY2}, Part 2 Execution Time`;
  console.time(timeString2);
  const part2 = getSafetyReportWithProblemDampener(formattedReports, 1, 3).filter(Boolean).length;
  console.timeEnd(timeString2);

  console.timeEnd(timeStringDay2);
  showAnswers(DAY2, part1, part2);
});

const formatReports = input => {
  return input.reduce((acc, curr) => {
    acc.push(curr.split(' ').map(n => parseInt(n.trim())));
    return acc;
  }, []);
};

const checkSafety = (report, min, max) => {
  let increasing = !!(report[1] - report[0] > 0);
  for (let i=1; i < report.length; i++) {
    const diff = report[i] - report[i - 1];
    if (Math.abs(diff) < min ||
        Math.abs(diff) > max ||
        diff < 0 && increasing === true ||
        diff > 0 && increasing === false
      ) {
      return false;
    }
  }
  return true;
};

const getSafetyReport = (reports, min, max) => {
  return reports.reduce((acc, curr) => {
    acc.push(checkSafety(curr, min, max));
    return acc;
  }, []);
};

const getSafetyReportWithProblemDampener = (reports, min, max) => {
  return reports.reduce((acc, curr) => {
    let safe = checkSafety(curr, min, max);
    if (!safe) {
      safe = canBeMadeSafe(curr, min, max);
    }
    acc.push(safe);
    return acc;
  }, []);
};

const canBeMadeSafe = (report, min, max) => {
  for (let i=0; i<report.length; i++) {
    if (checkSafety(removeElement(report, i), min, max)) {
      return true;
    }
  }
  return false;
};

const removeElement = (report, element) => {
  return [ ...report.slice(0, element), ...report.slice(element+1, report.length)];
};
