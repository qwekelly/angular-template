const { execSync }  = require('child_process');

const branchHash = execSync('git rev-parse --abbrev-ref HEAD').toString().trimRight();
const commitHash = execSync('git rev-parse --short HEAD').toString().trimRight();

const { writeFileSync, readFileSync } = require('fs');

let indexFile = readFileSync('src/index.html');

/** 在 index.html头部添加 commit sha */
indexFile = `<!-- ${branchHash} - ${commitHash} -->\n` + indexFile;

writeFileSync('src/index.html', indexFile);
