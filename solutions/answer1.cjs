//Traditional way - common js way - hence extension as cjs. If we don't include "type": "module", we can rename the extension as .js
const fs = require('fs').promises;
const path = require('path');

/*
//Without promise
function readFileContent(filePath) {
    // Implementation
    fs.readFile(filePath, 'utf8', (err, buffer) => {
        if(err) {
            console.log("Error reading the file --> " + err);
            return;
        }
        console.log(buffer);
    });
}
*/
//With promise
async function readFileContent(filePath){
    try {
        let buffer = await fs.readFile(filePath, "utf-8");
        console.log(buffer);
    } catch (err) {
        console.log("Error reading the file --> " + err);
    }
}
// Usage
(async () => {
    let absoluteFilePath = path.join(__dirname, "../inputs/inputFile-Q1.txt");
    console.log("Output of file content with data:");
    await readFileContent(absoluteFilePath);

    absoluteFilePath = path.join(__dirname, "../inputs/inputFile-Q1-empty.txt");
    console.log("Output of file content with no data:");
    await readFileContent(absoluteFilePath);

    absoluteFilePath = path.join(__dirname, "../inputs/inputFile-NonExistent.txt");
    console.log("Output of file content with no file:");
    await readFileContent(absoluteFilePath);
})();