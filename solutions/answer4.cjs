const path = require('path');
const colors = require('colors');

function resolvePath(relativePath) {
    return path.resolve(__dirname, relativePath);
}


let output = resolvePath('../inputs/inputFile-Q1.txt');
console.log(colors.yellow("Existing File Path Resolved: ") + colors.green(output));

output = resolvePath('nonexistent-folder/file.txt');
console.log(colors.yellow("Non-existent File Path Resolved: ") + colors.green(output));