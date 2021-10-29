//-------Задача 1 ----------------------
/*console.log('Record 1');

setTimeout(() => {
    console.log('Record 2');
    Promise.resolve().then(() => {
        setTimeout(() => {
            console.log('Record 3');
            Promise.resolve().then(() => {
                console.log('Record 4');
            });
        });
    });
});

console.log('Record 5');

Promise.resolve().then(() => Promise.resolve().then(() => console.log('Record 6')));*/
// Ответ: 1 5 6 2 3 4

//---------Задача 2-------------------------
/*Напишите программу, которая будет принимать на вход несколько аргументов: дату и время в формате
«час-день-месяц-год». Задача программы — создавать для каждого аргумента таймер с обратным отсчётом:
посекундный вывод в терминал состояния таймеров (сколько осталось). По истечении какого-либо таймера,
вместо сообщения о том, сколько осталось, требуется показать сообщение о завершении его работы. Важно,
чтобы работа программы основывалась на событиях.*/

const EventEmitter = require('events');

const emitter = new EventEmitter();
const datesScheduled =
    process.argv.slice(2)
        .map((el) => {
            return el.split('-');
        });

const datesConversionInMs = ([HH, mm, ss, DD, MM, YYYY]) => {
    return (new Date(YYYY, MM - 1, DD, HH, mm, ss)).getTime();
};


// const timer = () => {
//     setTimeout(function run () {
//         console.clear();
//         let timeMs = new Date((datesConversionInMs(datesScheduled) - Date.now()));
//         console.log(timeMs.getSeconds());
//         setTimeout(run, 1000);
//     }, 1000);
// };

const startTimer = async (dateScheduled) => {

    return new Promise(resolve => {

        setTimeout(function run() {
            // console.clear();
            let timeMs = new Date(dateScheduled - Date.now());

            if (Math.floor(timeMs.getTime() / 1000) <= 0) {
                emitter.emit('end');
                resolve();
            } else {
                emitter.emit('change', timeMs);
                setTimeout(run, 1000);
            }
        }, 1000);
    })


};

const run = async () => {
    const datesMs = datesScheduled.map(datesConversionInMs);

    const startTimerPromises = datesMs.map(startTimer);
    // for (let startTimerPromise of startTimerPromises) {
    //
    //     let result = await startTimerPromise;
    //     result.push(result);
    // }

    // new Promise (resolve =>  datesScheduled.forEach((el) => startTimer(el)));

};
// startTimer(datesScheduled[0]);
run();

emitter.on('end', () => console.log('ОК'));
emitter.on('change', (d) => console.log(d));
