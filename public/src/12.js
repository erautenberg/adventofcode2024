const DAY12 = 12;
parseData(DAY12, (input) => {
  const timeStringDay12 = `Day ${DAY12}, Total Execution Time`;
  console.time(timeStringDay12);

  const timeStringData1 = `Day ${DAY12}, Data Setup Execution Time`;
  console.time(timeStringData1);
  const garden = formatGarden(input);
  console.timeEnd(timeStringData1);

  const timeString1 = `Day ${DAY12}, Part 1 Execution Time`;
  console.time(timeString1);
  const regions = buildRegions(garden);
  const part1 = getTotalFencePrice(regions);
  console.timeEnd(timeString1);

  const timeString2 = `Day ${DAY12}, Part 2 Execution Time`;
  console.time(timeString2);
  const part2 = '';
  console.timeEnd(timeString2);

  console.timeEnd(timeStringDay12);
  showAnswers(DAY12, part1, part2);
});

const formatGarden = input => {
  return input.reduce((acc, curr) => {
    acc.push(curr.split(''));
    return acc;
  }, []);
};

const OFFSETS = {
  up: [-1, 0],
  down: [1, 0],
  left: [0, -1],
  right: [0, 1]
};

const buildRegions = garden => {
  const regions = new Map();
  const visited = new Set();

  for (let r=0; r < garden.length; r++) {
    for (let c=0; c < garden[r].length; c++) {
      const currRegion = garden[r][c];

      if (!visited.has(`${r},${c}`)) {
        const regionKey = `${currRegion}: ${r},${c}`;
        if (!regions.get(regionKey)) {
          regions.set(`${currRegion}: ${r},${c}`, new Set());
          regions.get(regionKey).add(`${r},${c}`);
          visited.add(`${r},${c}`);
        }

        const checkIfInRegion = (row, col) => {
          for (const dir in OFFSETS) {
            const nextR = row + OFFSETS[dir][0];
            const nextC = col + OFFSETS[dir][1];
            if (!regions.get(regionKey).has(`${nextR},${nextC}`)) {
              const nextLocation = garden[nextR] && garden[nextR][nextC];
              if (currRegion === nextLocation) {
                regions.get(regionKey).add(`${nextR},${nextC}`);
                visited.add(`${nextR},${nextC}`);
                checkIfInRegion(nextR, nextC);
              }
            }
          }
        };

        checkIfInRegion(r, c);
      }
    }
  }

  return regions;
};

const getPerimeter = region => {
  return region.reduce((acc, curr) => {
    const [ row, col ] = convertPointStrToArr(curr);
    for (const dir in OFFSETS) {
      const nextR = row + OFFSETS[dir][0];
      const nextC = col + OFFSETS[dir][1];
      if (region.indexOf(`${nextR},${nextC}`) > -1) {
        acc--;
      }
    }
    return acc;
  }, 4 * region.length);
};

const convertPointStrToArr = str => {
  return str.split(',').map(n => parseInt(n))
};

const getRegionFencePrice = region => {
  return region.length * getPerimeter(region);
}

const getTotalFencePrice = regions => {
  return regions.values().reduce((acc, curr) => acc += getRegionFencePrice([...curr]), 0);
}
