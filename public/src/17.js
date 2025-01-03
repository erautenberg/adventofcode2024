const DAY17 = 17;
parseData(DAY17, (input) => {
  const timeStringDay17 = `Day ${DAY17}, Total Execution Time`;
  console.time(timeStringDay17);

  const timeStringData1 = `Day ${DAY17}, Data Setup Execution Time`;
  console.time(timeStringData1);
  const instr = formatInstr(input);
  console.timeEnd(timeStringData1);

  const timeString1 = `Day ${DAY17}, Part 1 Execution Time`;
  console.time(timeString1);
  const part1 = getOutput(instr);
  console.timeEnd(timeString1);

  const timeString2 = `Day ${DAY17}, Part 2 Execution Time`;
  console.time(timeString2);
  const part2 = getNewA(instr);
  console.timeEnd(timeString2);

  console.timeEnd(timeStringDay17);
  showAnswers(DAY17, part1, part2);
});

const formatInstr = input => {
  return input.reduce((acc, curr) => {
    if (curr !== '') {
      const matches = curr.match(/Register (\w): (\d+)/);
      if (matches?.length == 3 && matches[1] && matches[2]) {
        acc.registers[matches[1].toLowerCase()] = parseInt(matches[2]);
      } else {
        acc.instructions = curr.split('Program: ')[1].split(',').map(n => parseInt(n));
      }
    }
    return acc;
  }, { registers: {}, instructions: [] });
};

const performOps = ({ registers, instructions }) => {
  let { a, b, c } = registers;
  let i = 0;
  let output = [];

  while (i < instructions.length - 1) {
    const opcode = instructions[i];
    const operand = instructions[i + 1];

    let comboOperand;
    switch (operand) {
      case 0:
      case 1:
      case 2:
      case 3:
        comboOperand = operand;
        break;
      case 4:
        comboOperand = a;
        break;
      case 5:
        comboOperand = b;
        break;
      case 6:
        comboOperand = c;
        break;
    }

    switch (opcode) {
      case 0:
        a = Math.floor(a / (2 ** comboOperand));
        break;
      case 1:
        b = b ^ operand;
        break;
      case 2:
        b = comboOperand % 8;
        break;
      case 3:
        if (a !== 0) {
          i = operand;
          continue;
        }
        break;
      case 4:
        b = b ^ c;
        break;
      case 5:
        output.push(comboOperand % 8);
        break;
      case 6:
        b = Math.floor(a / (2 ** comboOperand));
        break;
      case 7:
        c = Math.floor(a / (2 ** comboOperand));
        break;
    }

    i += 2;
  }

  return output;
};

const getOutput = instr => {
  return performOps(instr).join(',');
}

const getNewA = ({ registers, instructions }) => {
  const program = instructions.join(',');
  let output = getOutput({ registers, instructions });

  const skipBy8s = (a, i) => {
    if (i === instructions.length) {
      output = getOutput({ registers: { ...registers, a }, instructions });
      return program === output ? a : false;
    }

    a *= 8;
    for (let byte = 0; byte < 8; byte++) {
      output = getOutput({ registers: { ...registers, a: a + byte }, instructions });
      if (program.endsWith(output)) {
        let newA = skipBy8s(a + byte, i + 1);
        if (newA) {
          return newA;
        }
      }
    }
    return false;
  };

  return skipBy8s(0, 0);
};
