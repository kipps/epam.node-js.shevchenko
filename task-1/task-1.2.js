import csv from 'csvtojson';
import fs from 'fs';


const csvFile = './task-1/files/table.csv';
const fileStream = fs.createReadStream(csvFile);
const writeable = fs.createWriteStream('./task-1/files/result.txt');

fileStream
    .pipe(csv({
        delimiter: 'auto',
        noheader: false,
        headers: ['book', 'author', 'amount', 'price'],
        colParser: {
            "book": "string",
            "author": "string",
            "amount": "number",
            "price": "number",
        },
    })
        .on('done', err => {
            if (!err) {
                console.log('Done successful!');
                return;
            }
            console.log(`Error: ${err}`);
        }))
    .pipe(writeable);





