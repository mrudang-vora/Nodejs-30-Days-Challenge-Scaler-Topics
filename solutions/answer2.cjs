//const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
/*
function writeToFile(filePath, content) {
    fs.writeFile(filePath, content,"utf-8", (err)=>{
        if(err){
            console.log(err);
        }else{
            console.log("Data written to file: ");
        }
    });
}
*/
async function writeToFile(filePath, content) {
    try {
        await fsPromises.writeFile(filePath, content, 'utf8');
        console.log("Data written to file:", filePath);
    } catch (err) {
        console.error("Error writing to file:", err);
    }
}

(async() =>{
let absoluteFilePath = path.join(__dirname, "../outputs/output-Q2.txt");
await writeToFile(absoluteFilePath, 'Sample content.');
// Expected Output: Data written to output1.txt

absoluteFilePath = path.join(__dirname, "../outputs/Q2/output-Q2.txt");
await writeToFile(absoluteFilePath, 'Content in a non-existent folder.');
// Expected Output: Error writing to file: ENOENT: no such file or directory...
})();