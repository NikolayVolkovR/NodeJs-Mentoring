const fs = require("fs");
const zlib = require("zlib");
const fsPromises = fs.promises;
const filePath = "./examples/filesystem-and-streams-test.js";
const options = "utf8";
const readingFileText = "Reading file...";
const writingFilePath = "./examples/some-test-file.txt";
const gzFilePath = "./examples/out.txt.gz";
const { pipeline } = require("stream");

/*
const fileContent = fs.readFileSync('./examples/event-loop.js', options);
const fileContentBuffer = fs.readFileSync('./examples/event-loop.js');
console.log(fileContentBuffer.toString());*/

/*const fileData = 'some text';
fs.writeFileSync(filePath, fileData, options);

console.log(fs.readFileSync(filePath, options));*/

/*const folderPath = './examples/test-folder-wrapper/test-folder';

try {
    fs.mkdirSync(folderPath);
} catch (error) {
    console.error('Failed. Needs recursive: true');
}

fs.mkdirSync(folderPath, { recursive: true });*/

// console.assert(1 === 2, 'is not Ok');

/*
fs.readFile('./examples/event-loop.js', options, (error, file) => {
   console.log(file);
});

console.log(readingFileText);*/

/*
fsPromises.readFile(filePath, options)
    .then((file) => console.log(file));
console.log('Reading file..');*/

/*async function read() {
    const file = await fsPromises.readFile(filePath, options);
    console.log(readingFileText);
    console.log(file);
}
read();*/

/*
// error handling
fs.readFile(filePath, options, (error, file) => {
    if (error) {
        return console.error(error.message);
    }
    console.log(file);
});
console.log(readingFileText);*/

/*// promise catch error handling
fsPromises.readFile(filePath, options)
    .then((file) => console.log(file))
    .catch((error) => console.log(error.message));

console.log(readingFileText);*/

/*// async functions error handling
async function read() {
    console.log(readingFileText);
    try {
        const file = await fsPromises.readFile(filePath, options);
        console.log(file);
    } catch (error) {
        console.log(error.message);
    }
}
read();*/

/*// Buffers
const bufferHi = Buffer.from('hi');
console.log(bufferHi);

const bufferFromArray = Buffer.from([0x68, 0x69]);
console.log(bufferFromArray);
console.log(bufferFromArray.toString());

const bufferAlloc = Buffer.alloc(3, 0x61);
console.log(bufferAlloc);*/

// Streams
/*const rStream = fs.createReadStream(filePath, {
    highWaterMark: 10 // max chunk size
});

rStream.on('data', (chunk) => {
    console.log(chunk.length);
});

rStream.on('close', () => {
    console.log('file was closed');
});

rStream.on('error', (error) => {
    console.log(error.message);
});*/

// STDIN / STDOUT / STDERR - стримы ввода / вывода / ошибки консоли (0:54)

/*const writable = fs.createWriteStream(writingFilePath, options);
writable.write('first write,');
writable.write(' second write,');
writable.end(' final write');*/

/*const writable = fs.createWriteStream(writingFilePath, options);

function writeOneMillionTimes(writer, data, encoding, callback) {
    let i = 1e6;
    write();

    function write() {
        let ok = true;
        do {
            i--;
            if (i === 0) {
                // Last time
                writer.write(data, encoding, callback);
            } else {
                // See if we should continue or wait.
                // Don't pass the callback, because we're not done yet.
                ok = writer.write(data, encoding);
            }
        } while (i > 0 && ok);
        if (i > 0) {
            // Had to stop early.
            // Write some more once it drains.
            writer.once('drain', write);
        }
    }
}

writeOneMillionTimes(writable, "word ", options, error => {
    if (error) {
        console.log(error.message);
    } else {
        console.log('finished');
    }
});*/

/*
const gzip = zlib.createGzip(); // duplex stream
const readable = fs.createReadStream(writingFilePath);
const writable = fs.createWriteStream(gzFilePath);

// readable.pipe(gzip).pipe(writable);

// with error handling
readable.pipe(gzip)
    .on('error', () => { /!* handle error*!/ })
    .pipe(writable)
    .on('error', () => { /!* handle error *!/ });*/

/*pipeline(
    fs.createReadStream(writingFilePath),
    zlib.createGzip(),
    fs.createWriteStream(gzFilePath),
    (error) => {
        if (error) { /!* error handle *!/ }
        else { console.log('finished') }
    }
);*/
