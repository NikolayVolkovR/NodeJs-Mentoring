// Дополнительный вариант

import { Transform } from 'stream';

const transformer = new Transform({
    transform(chunk, encoding, callback) {
        callback(null, `${chunk.reverse().toString().trim()}\n\n`)
    }
});

process.stdin.pipe(transformer).pipe(process.stdout);

/*const stream = require('stream');
const Duplex = stream.Duplex || require('readable-stream').Duplex;

const duplex = new Duplex();

duplex.on('readable', () => {
    const chunk = duplex.read();
    duplex.write('some text');
    console.log(chunk);
});

process.stdin.pipe(duplex).pipe(process.stdout);*/

/*
// process.stdin.pipe(process.stdout);

// readable.pipe(gzip).pipe(writable);
process.stdin.on('data', (data) => {
    const value = data.toString().trim();
    if (value === 'exit') {
        process.exit();
    }

    process.stdout.write(`${[...data.toString().trim()].reverse().join('')}\n\n\n`)
});

process.on('exit', () => {
    process.stdout.write('\n\nYou are out of input\n\n');
});*/
