const path = require('path');
const fs = require('fs');
const readline = require('readline');

const dbPath = path.resolve('./10m.txt');

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
    let decr_arr = [];
    let decr_temp_arr = [];

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

            if (incr_temp_arr.length > incr_arr.length) {
              incr_arr = [...incr_temp_arr];
            }
          } else {
            incr_temp_arr = [num];
          }
        } else {
          incr_temp_arr.push(num);
        }

        if (decr_temp_arr.length > 0) {
          if (num < decr_temp_arr[decr_temp_arr.length - 1]) {
            decr_temp_arr.push(num);

            if (decr_temp_arr.length > decr_arr.length) {
              decr_arr = [...decr_temp_arr];
            }
          } else {
            decr_temp_arr = [num];
          }
        } else {
          decr_temp_arr.push(num);
        }
      }
    }

    let bot = null;
    let top = null;
    let delta = null;
    let dif = null;
    let med = null;

    async function oddQuantityMedian() {
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
    }

    async function evenQuantityMedian() {
      let m1 = null;
      let m2 = null;
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
            m1 = num;
            delta = dif;
          } else if (dif < delta) {
            m2 = m1;
            m1 = num;
            delta = dif;
          }
        }
      }
      med = (m1 + m2) * 0.5;
    }

    if (i % 2 === 0) {
      await evenQuantityMedian();
    } else {
      await oddQuantityMedian();
    }

    console.log('Максимальне число в файлі: ', max)
    console.log('Мінімальне число в файлі: ', min)
    console.log('Медіана: ', med)
    console.log('Середнє арифметичне значення: ', avg)
    console.log('Найбільша послідовність чисел на збільшення: ', incr_arr)
    console.log('Найбільша послідовність чисел на зменшення: ', decr_arr)
  
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
