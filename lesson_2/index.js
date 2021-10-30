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

/**
 * Конструктор тайеров
 */
class Timer {
    constructor(timerEnd, index) {
        this.id = index + 1;
        this.isActive = true;
        this.timerEnd = timerEnd;
    }
}

/**
 * Создает таймер.
 */
const timeRun = (timerEnd) => {
    const valueTimer = new Date(timerEnd - Date.now());
    return Math.floor(valueTimer.getTime() / 1000);
}

/**
 *   Конвектирую дату в милисекунды и создаю массив объектов-таймеров
 */
const createsTimer = () => {
    const datesMs = datesScheduled.map(datesConversionInMs);
    const timers = []
    for (let i = 0; i <= datesMs.length - 1; i++) {
        const timer = new Timer(datesMs[i], i);
        timers.push(timer);
    }
    return timers;
};

/**
 * Формирую четабильный вид таймеров и вывожу в консоль
 */
const timerDisplay = (timer) => {
    return console.log(
        'years: ' + Math.floor((timer / (60 * 60 * 24)) / 365) +
        ' months: ' + Math.floor((timer / (60 * 60 * 24 * 30)) % 12) +
        ' days: ' + Math.floor(timer / (60 * 60 * 24)) +
        ' hours: ' + Math.floor(timer / (60 * 60) % 24) +
        ' minutes:' + Math.floor((timer / 60) % 60) +
        ' seconds: ' + Math.floor(timer % 60) + '\n'
    )
};


/**
 * Зпускает веськод
 */
const run = () => {
    const timers = createsTimer();
    let i = setInterval(() => {
        console.clear();
        for (const timer of timers) {
            console.log('ID таймера ' + timer.id);
            let valueTimer = timeRun(+timer.timerEnd);
            if (valueTimer <= 0) {
                timer.isActive = false;
            }
            if (timer.isActive === true) {
                timerDisplay(valueTimer);
            } else {
                emitter.emit('finish', timer.id);
            }
        }
        if (timers.every((el) => el.isActive === false)){
            clearInterval(i);
        }
    }, 1000)
};


run();

emitter.on('finish', (id) => console.log(`Тамер с ID ${id}, завершен \n`));

