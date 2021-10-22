const colors = require('colors');

let [start, end] = process.argv.slice(2);
const arrPrimeNumber = [];
const isPrimeNumber = (number) => {

    if (number < 2) {
        return false;
    }

    for (let i = 2; i <= Math.sqrt(number); i++) {

        if (number % i === 0) {
            return false;
        }
    }

    return true;
};

if (!isNaN(+start) && !isNaN(+end) && start <= end) {
    while (start < end) {

        if (isPrimeNumber(+start)) {

            arrPrimeNumber.push(+start)
        }

        start++;
    }
    if (arrPrimeNumber.length === 0) console.log(colors.red('простыхчисел нет'));
} else {
    console.log(colors.red('Диопазон введен не корректно'));

}

const alertPrimeNumber = (arr) => {
    if (arr.length === 0) return;
    let result = arr.splice(0, 3);
    console.log(colors.green(result[0]));
    if (result[1] !== undefined) console.log(colors.yellow(result[1]));
    if (result[2] !== undefined) console.log(colors.red(result[2]));
    alertPrimeNumber(arr);

}

alertPrimeNumber(arrPrimeNumber);




