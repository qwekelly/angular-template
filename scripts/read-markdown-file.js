const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '../src/assets/markdown');


let fileName = fs.readdirSync(src).filter(file => file.includes('.md'));
fileName = fileName.map(file => file.split('.')[0]);

console.log(fileName);