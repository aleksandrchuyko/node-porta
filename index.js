const path = require('path');
const fs = require('fs');
const readline = require('readline');

const dbPath = path.resolve('./hello.txt');

async function parseFile() {
  try {
    let readInterface = null;

    let i = 0;
    let num = null;
    let min = null;
    let max = null;
    let avg = null;
    let incr_arr = [];
    let incr_temp_arr = [];

    readInterface = readline.createInterface({
      input: fs.createReadStream(dbPath),
    });

    for await (const line of readInterface) {
      num = +line.trim();

      if (Number.isInteger(num) && line !== '') {
        i++;

        if (min === null) min = num;
        if (max === null) max = num;

        avg = avg !== null ? (avg * (i - 1) + num) / i : num;

        if (num < min) {
          min = num;
        } else if (num > max) {
          max = num;
        }

        if (incr_temp_arr.length > 0) {
          if (num > incr_temp_arr[incr_temp_arr.length - 1]) {
            incr_temp_arr.push(num);
            if (incr_temp_arr.length > incr_arr.length)
              incr_arr = [...incr_temp_arr];
          } else {
            incr_temp_arr = [];
          }
        } else {
          incr_temp_arr.push(num);
        }
      }
    }

    let bot = null;
    let top = null;
    let delta = null;
    let dif = null;
    let med = null;

    readInterface = readline.createInterface({
      input: fs.createReadStream(dbPath),
    });

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
    console.log(incr_arr);
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
