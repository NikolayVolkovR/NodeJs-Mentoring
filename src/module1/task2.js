const csvFilePath = "./src/module1/nodejs-hw1-ex1.csv";
const txtFilePath = "./src/module1/nodejs-hw1-ex1.txt";
const csv = require("csvtojson");
const fs = require("fs");

const readStream = fs.createReadStream(csvFilePath);
const writeStream = fs.createWriteStream(txtFilePath);

readStream
  .pipe(csv())
  .on("error", (error) => {
    console.log(error);
  })
  .pipe(writeStream)
  .on("error", (error) => {
    console.log(error);
  });
