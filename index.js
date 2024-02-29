const path = require('path');
const fs = require('fs');
const readline = require('readline');

const dbPath = path.resolve('./10m.txt');

async function parseFile() {
  try {
    let readInterface = readline.createInterface({
      input: fs.createReadStream(dbPath),
    });
    let i = 0;
    let num = null;
    let min = null;
    let max = null;
    let avg = null;

    for await (const line of readInterface) {
      num = +line.trim();

      if (Number.isInteger(num) && line !== '') {
        i++;

        if (min === null) min = num;
        if (max === null) max = num;
        // arr.push[num];
        avg = avg !== null ? (avg * (i - 1) + num) / i : num;
        // console.log(avg);
        if (num < min) {
          min = num;
        } else if (num > max) {
          max = num;
        }
      }
    }

    readInterface = readline.createInterface({
      input: fs.createReadStream(dbPath),
    });

    let bot = null;
    let top = null;
    let delta = null;
    let dif = null;
    let med = null;

    for await (const line of readInterface) {
      num = +line.trim();
      if (Number.isInteger(num) && line !== '') {
        bot = Math.abs(min - num);
        top = Math.abs(max - num);
        dif = Math.abs(top - bot);
        if (delta === null) {
          med = num;
          delta = dif;
        } else if (dif < delta) {
          med = num;
          delta = dif;
        }
      }
    }

    console.log(min, max, avg, med);
  } catch (error) {
    console.log(error);
  }
}

(async () => {
  try {
    await parseFile();
  } catch (error) {
    console.log(error.message);
  }
})();
