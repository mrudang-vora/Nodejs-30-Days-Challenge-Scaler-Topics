//ES6 standards => We can have file extension as .js if we have added type: module in package.json
import fs from 'fs';
import path from 'path';

async function readFileContent(filePath) {
    // Implementation
    fs.readFile(filePath, 'utf8', (err, buffer) => {
        if(err) {
            console.log("Error reading the file --> " + err);
            return;
        }
        console.log(buffer);
    });
}
//Usage
//By default pathname has forward slash, hence slicing it to return string from 1 (0 - forward slash would be removed)
const __dirname = path.dirname(new URL(import.meta.url).pathname.slice(1));
const absoluteFilePath = path.join(__dirname, "../inputs/inputFile-question1.txt");
readFileContent(absoluteFilePath);
