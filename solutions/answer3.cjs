const cp = require("child_process");
//sync method
function executeCommand(command) {
    try {
        return cp.execSync(command, { encoding: 'utf-8' });
    } catch (error) {
        return error.message;
    }
}
//Async method
function executeCommandAsync(command){
   return new Promise((resolve, reject) => {
        cp.exec(command,(error, stdout, stderr)=>{
            //We use return with reject(error) to immediately exit the Promise's executor function and reject the Promise if an error occurs
            if(error){
                reject(error.message);
            }
            if(stderr) {
                reject(new Error(stderr));
            }
            resolve(stdout);
        })
   });
}

let command = 'ls -la';
console.log(executeCommand(command));
// Expected Output: (output of ls -la)
command = 'echo "Hello, Node.js!"';
console.log(executeCommand(command));
// Expected Output: Hello, Node.js!

(async()=>{
    try {
        let command = 'dir';
        let output = await executeCommandAsync(command);
        console.log(output);
        command = 'echo "Hello, Node.js!"';
        output = await executeCommandAsync(command);
        console.log(output);
    } catch (error) {
        console.error('Error executing command:', error);
    }
})();