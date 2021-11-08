//По ссылке вы найдете файл с логами запросов к серверу весом более 2 Гб.
// Напишите программу, которая находит в этом файле все записи с ip-адресами 89.123.1.41 и 34.48.240.111,
// а также сохраняет их в отдельные файлы с названием “%ip-адрес%_requests.log”.

const fs = require('fs');
const readline = require('readline');


const ip = ['89.123.1.41', '34.48.240.111'];
const readStream = fs.createReadStream('lesson_3/access.log', {
    flags: 'r',
    encoding: 'utf8'
});

const runWrite = (arrayIps) => {
    for(let arrayIp of arrayIps) {
        console.log(arrayIp);
        const writeStream = fs.createWriteStream(`lesson_3/${arrayIp}_request.log`,
            {
                encoding: "utf-8"
            });
        const readLine = readline.createInterface({input: readStream});
        readLine.on('line', (line) => {
            if(line.includes(arrayIp)) {
                writeStream.write(line + '\n');
            }
        })
    }
}

runWrite(ip);


