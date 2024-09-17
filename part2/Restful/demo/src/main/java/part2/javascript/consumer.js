const prompt = require('prompt-sync')();
const fetch = require('node-fetch');
const fs = require('fs');
let url = 'http://localhost:8080/Access';
var choice = 0;

(async () => {
    try{
    while (choice != 4) {
        //menu
        console.log('\n\t1. Get list of the running processes\n');
        console.log('\t2. Get the screenshot of the remote system\n');
        console.log('\t3. Reboot the remote system\n');
        console.log('\t4. Exit\n');
        choice = prompt('\tPlease input your choice: ');
        
        //get List of running processes
        if (choice == 1) {
            await fetch(url + '/List').then((value) => {
                return value.text();
            }).then((d) => {
                if(d[0][0] != null){
                    console.log('\n\tList of processes:');
                    console.log('\tName: ' + d[0][0]);
                }
                else {
                    console.log('\n\tOperation Failed!')
                }
            }).catch((error) => {
                console.log(error);
            });
        }
        
        
        //get screenshot
    else if (choice == 2) {
            await fetch(url + '/capture').then((value) => {
                return value.text();
            }).then((d) => {
                if(d == null){
                    console.log('\n\tOperation Failed!');
                }
                else{
                    //console.log(d)
                    async function saveImage(filename, d){
                        var Buffer = Buffer.from(d,"base64")
                        fs.writeFile('./scr_remote_system/'+filename, Buffer, function(err) {
                            if(err) {
                                console.log(err);
                            } else {
                                console.log("\n\tThe file was saved!");
                            }
                        });
                    }

                    var today = new Date();
                    var d = today.getFullYear()+'_'+(today.getMonth()+1)+'_'+today.getDate();
                    var t = today.getHours() + "_" + today.getMinutes() + "_" + today.getSeconds();
                    var date = d+'_'+t;

                    saveImage(date + ".jpg", d);
                }
            }).catch((error) => {
                console.log(error);
            });
        }
        //restart
        else if (choice == 3) {
            await fetch(url + '/restart').then((d) => {
                return d.text();
            }).then((result) => {
                if (result == "true") {
                    console.log('\n\tOperation Successful!');
                }
                else {
                    console.log('\n\tOperation Failed!');
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    }
    }catch(error){console.log(error)}

})()