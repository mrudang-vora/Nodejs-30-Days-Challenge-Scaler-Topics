const path = require("path");
const colors = require('colors');

function checkFileExtension(filePath, expectedExtension) {
    let objFile = {};
    objFile.actualExtension = path.extname(filePath);
    if(objFile.actualExtension == expectedExtension){
        objFile.isFileExtensionMatching = true;
    }
    return objFile;
}

//Test cases:
let arrFilePaths =  [    
                        path.join(__dirname, '../inputs/inputFile-Q1.txt')
                        , path.join(__dirname, '../inputs/inputFile-Q1.png')
                    ];
let arrExpectedExtensions = ['.txt', '.txt'];

for(let i = 0; i < arrFilePaths.length; i++){
    let filePath = arrFilePaths[i];
    let expectedExtension = arrExpectedExtensions[i];
    let objFile = checkFileExtension(filePath, expectedExtension);
    if(objFile.isFileExtensionMatching) {
        console.log(colors.green("File has the expected extension: " + expectedExtension));
    }else{
        console.log(colors.red("File does not have the expected extension. Expected: " + expectedExtension + ", Actual: " + objFile.actualExtension));
    }
}