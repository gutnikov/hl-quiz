const csvParser = require('node-csv-parse');
const fs = require('fs');
const path = require('path');
require('should');

const FILE_NAME = 'questions.csv';
const OUTPUT_FILE = '../client/src/_questions.json';

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }

    return a;
}

fs.readFile(path.resolve(__dirname, FILE_NAME), 'utf8', (err, data) => {
    if (err) {
        return console.log(err);
    }

    const result = csvParser(data).asObjects();

    if (!result) {
        return console.log('Can not parse files');
    }

    let outResult = [];

    result.forEach(item => {
        const k = Object.keys(item);
        const question = item[k[0]];
        const rightAnswer = item[k[1]];

        const answers = shuffle([
            item[k[1]],
            item[k[2]],
            item[k[3]],
            item[k[4]]
        ]);

        const rightKey = answers.indexOf(rightAnswer) + 1;

        const entry = {
            'text': question,
            'variants': answers,
            'rightAnswer': rightKey
        };

        outResult.push(entry);
    });

    var json = JSON.stringify(outResult);

    fs.writeFile(path.resolve(__dirname, OUTPUT_FILE), json, 'utf8', () => {
        console.log('Parsing completed. JSON file has been updated');
    });
});






