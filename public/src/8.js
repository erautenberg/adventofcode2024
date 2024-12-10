const DAY8 = 8;
parseData(DAY8, (input) => {
  const timeStringDay8 = `Day ${DAY8}, Total Execution Time`;
  console.time(timeStringDay8);

  const timeStringData1 = `Day ${DAY8}, Data Setup Execution Time`;
  console.time(timeStringData1);
  const antennas = formatAntennas(input);
  console.timeEnd(timeStringData1);

  const timeString1 = `Day ${DAY8}, Part 1 Execution Time`;
  console.time(timeString1);
  const antinodes = getAllAntinodes(antennas, input.length, input[0].length);
  const part1 = getUniqueLocations(antinodes).size;
  console.timeEnd(timeString1);

  const timeString2 = `Day ${DAY8}, Part 2 Execution Time`;
  console.time(timeString2);
  const part2 = '';
  console.timeEnd(timeString2);

  console.timeEnd(timeStringDay8);
  showAnswers(DAY8, part1, part2);
});

const formatAntennas = input => {
  return input.reduce((acc, curr, r) => {
    curr.split('').forEach((antenna, c) => {
      if (antenna !== '.') {
        acc.get(antenna) ?
          acc.get(antenna).push([r, c]) :
          acc.set(antenna, [[r, c]]);
      }
    });
    return acc;
  }, new Map());
};

const getUniqueLocations = antinodes => {
  const iterator = antinodes.keys();
  let frequency = iterator.next().value;
  let uniqueLocations = new Set();
  while (frequency) {
    antinodes.get(frequency).forEach(node => uniqueLocations.add(`${node[0]},${node[1]}`));
    frequency = iterator.next().value;
  }
  return uniqueLocations;
}

const getAllAntinodes = (antennas, maxRows, maxColumns) => {
  const iterator = antennas.keys();
  let frequency = iterator.next().value;
  let antinodes = new Map();
  while (frequency) {
    antinodes.set(frequency, getAntinodes(antennas.get(frequency), maxRows, maxColumns));
    frequency = iterator.next().value;
  }
  return antinodes;
};

const getAntinodes = (locations, maxRows, maxColumns) => {
  const antinodes = [];

  for (let i=0; i<locations.length - 1; i++) {
    for (let j=i+1; j<locations.length; j++) {
      const antennaA = locations[i];
      const antennaB = locations[j];
      let antinodeA = [];
      let antinodeB = [];

      const rowOffset = Math.abs(antennaA[0] - antennaB[0]);
      if (antennaA[0] < antennaB[0]) {
        antinodeA.push(antennaA[0] - rowOffset);
        antinodeB.push(antennaB[0] + rowOffset);
      } else {
        antinodeA.push(antennaA[0] + rowOffset);
        antinodeB.push(antennaB[0] - rowOffset);
      }

      const columnOffset = Math.abs(antennaA[1] - antennaB[1]);
      if (antennaA[1] < antennaB[1]) {
        antinodeA.push(antennaA[1] - columnOffset);
        antinodeB.push(antennaB[1] + columnOffset);
      } else {
        antinodeA.push(antennaA[1] + columnOffset);
        antinodeB.push(antennaB[1] - columnOffset);
      }

      antinodeA[0] >= 0 && antinodeA[0] < maxRows &&
        antinodeA[1] >= 0 && antinodeA[1] < maxColumns &&
        antinodes.push(antinodeA);

      antinodeB[0] >= 0 && antinodeB[0] < maxRows &&
        antinodeB[1] >= 0 && antinodeB[1] < maxColumns &&
        antinodes.push(antinodeB);
    }
  }
  return antinodes;
};
