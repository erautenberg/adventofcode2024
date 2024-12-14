const DAY14 = 14;
parseData(DAY14, (input) => {
  const timeStringDay14 = `Day ${DAY14}, Total Execution Time`;
  console.time(timeStringDay14);

  const timeStringData1 = `Day ${DAY14}, Data Setup Execution Time`;
  console.time(timeStringData1);
  const robots = formatRobots(input);
  console.timeEnd(timeStringData1);

  const timeString1 = `Day ${DAY14}, Part 1 Execution Time`;
  console.time(timeString1);
  const part1 = getSafetyFactor(robots, 100, 101, 103);
  console.timeEnd(timeString1);

  const timeString2 = `Day ${DAY14}, Part 2 Execution Time`;
  console.time(timeString2);
  const part2 = '';
  console.timeEnd(timeString2);

  console.timeEnd(timeStringDay14);
  showAnswers(DAY14, part1, part2);
});

const formatRobots = input => {
  return input.reduce((acc, curr) => {
    let robot = {};
    curr.split(' ').forEach(point => {
      const matches = point.match(/(\w)\=(-?\d+)\,(-?\d+)/);
      if (matches.length === 4) {
        robot[matches[1]] = { x: parseInt(matches[2]), y: parseInt(matches[3]) };
      }
    });
    acc.push(robot);
    return acc;
  }, []);
};

const updatePosition = (robot, seconds, width, height) => {
  const { x: vx, y: vy } = robot.v;
  let { x: px, y: py } = robot.p;

  for (let i=0; i<seconds; i++) {
    if (px + vx < 0) {
      px = width + px + vx;
    } else if (px + vx > width - 1) {
      px = px + vx - width;
    } else {
      px += vx;
    }

    if (py + vy < 0) {
      py = height + py + vy;
    } else if (py + vy > height - 1) {
      py = py + vy - height;
    } else {
      py += vy;
    }
  }

  return { x: px, y: py };
}

const getFinalPositions = (robots, seconds, width, height)  => {
  return robots.reduce((acc, curr) => {
    acc.push(updatePosition(curr, seconds, width, height));
    return acc;
  }, []);
}

const countQuadrantsAfterSeconds = (robots, seconds, w, h)  => {
  const final = getFinalPositions(robots, seconds, w, h);
  const topLeft = {
    x1: 0, y1: 0,
    x2: Math.floor(w / 2) - 1, y2: Math.floor(h / 2) - 1
  };
  const topRight = {
    x1: Math.floor(w / 2) + 1, y1: 0,
    x2: w - 1, y2: Math.floor(h / 2) - 1
  };
  const bottomLeft = {
    x1: 0, y1: Math.ceil(h / 2),
    x2: Math.floor(w / 2) - 1, y2: h - 1
  };
  const bottomRight = {
    x1: Math.floor(w / 2) + 1, y1: Math.ceil(h / 2),
    x2: w - 1, y2: h - 1
  };
  const quadrants = { topLeft, topRight, bottomLeft, bottomRight };

  return final.reduce((acc, { x, y }) => {
    for (q in quadrants) {
      if (x >= quadrants[q].x1 && x <= quadrants[q].x2 &&
          y >= quadrants[q].y1 && y <= quadrants[q].y2
        ) {
        acc[q] = ++acc[q];
      }
    }
    return acc;
  }, { topLeft: 0, topRight: 0, bottomLeft: 0, bottomRight: 0 });
};

const getSafetyFactor = (robots, seconds = 100, w = 11, h = 7)  => {
  const quadrantCounts = countQuadrantsAfterSeconds(robots, seconds, w, h);
  return Object.keys(quadrantCounts).reduce((acc, curr) => acc *= quadrantCounts[curr], 1);
};
