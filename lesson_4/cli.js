#! /usr/bin/node

const fs = require('fs');
const path = require('path');
// const readline = require('readline');
// const yargs = require('yargs');
const inquirer = require('inquirer');

// const LOG_FILE = './access.log';

// console.log(process.argv);
// fs.readFile(LOG_FILE, 'utf-8', (err, data) => {
//     if (err) console.log(err);
//     else console.log(data);
// });
// fs.readFile(process.argv[2], 'utf-8', (err, data) => {
//     if (err) console.log(err);
//     else console.log(data);
// });

// const options = yargs
//     .usage('Usage: -p <path to the file>')
//     .option('p', {
//         alias: 'path',
//         // alias: ['path', 'path2']
//         describe: 'Path to the file',
//         type: 'string',
//         demandOption: true,
//     }).argv;
//
// console.log(options);

// fs.readFile(options.p, 'utf-8', (err, data) => {
//     if (err) console.log(err);
//     else console.log(data);
// });

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });

// rl.question('Please enter the path to the file: ', (filePath) => {
//     console.log('path:', filePath);
//     // rl.close();
//     rl.question('Please enter the encoding: ', (encoding) => {
//         console.log('encoding:', encoding);
//         rl.close();
//     });
// });

// const question = async (question) => new Promise(resolve => rl.question(question, resolve));
//
// (async () => {
//     const filePath = await question('Please enter the path to the file: ');
//     // const fullPath = path.join(__dirname, filePath);
//     const fullPath = path.resolve(__dirname, filePath);
//     console.log(fullPath);
//     const encoding = await question('Please enter the encoding: ');
//
//     // const data = fs.readFileSync(filePath, encoding);
//     // console.log(data);
//     // rl.close();
//
//     fs.readFile(fullPath, encoding, (err, data) => {
//         console.log(data);
//         rl.close();
//     });
// })()

//В домашнем задании вам нужно будет применить полученные знания к программе, которую вы написали по итогам прошлого урока.
//Для этого превратите её в консольное приложение, по аналогии с разобранным примером и добавьте следующие функции:
//* Возможность передавать путь к директории в программу. Это актуально, когда вы не хотите покидать текущую директорию,
// но вам необходимо просмотреть файл, находящийся в другом месте;
//* В содержимом директории переходить во вложенные каталоги;
//* При чтении файлов искать в них заданную строку или паттерн.

const executionDir = process.cwd();
const isFile = (fileName) => fs.lstatSync(fileName).isFile();
const isDir = (dirName) => fs.lstatSync(dirName).isDirectory();
const list = fs.readdirSync('./');

const readDirReq = (pathUrl, list) => {

    inquirer.prompt([
        {
            name: 'name',
            type: 'list', // input, number, confirm, list, checkbox, password
            message: pathUrl,
            choices: list,
        },
    ])
        .then(({name}) => {
            const fullPath = path.join(pathUrl, name);
            if (isDir(fullPath)) {
                list = fs.readdirSync(fullPath);
                if (list.length !== 0) {
                    readDirReq(fullPath, list);
                } else {
                    console.log('Empty')
                }
            }
            if (isFile(fullPath)) {
                fs.readFile(fullPath, 'utf-8', (err, data) => {
                    if (err) console.log(err);
                    else console.log(data);
                });
            }

        });

}

readDirReq(executionDir, list);



