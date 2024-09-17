const prompt = require('prompt-sync')();
const fs = require('fs');
let soap = require('soap');
let url = '../resources/RemoteAccessService.wsdl';
var choice = 0;


soap.createClientAsync(url).then(async (client) => {

    while (choice != 4) {
        //menu
        console.log('\n\t1.Get the screenshot of the remote system\n');
        console.log('\t2.Get the running processes \n');
        console.log('\t3.Reboot the remote system\n');
        console.log('\t4.Exit\n');
        choice = prompt('\tPlease input your choice: ');

        
        //get screenshot
        if (choice == 1) {
            await client.getCaptureAsync(url).then((d) => {
                if(d[0] == null){
                    console.log('\n\tOperation Failed!');
                }
                else{
                    function saveImage(filename, d){
                        var Buffer = Buffer.from(d,"base64")
                        fs.writeFile('./scr_remote_system/'+filename, Buffer, function(err) {
                            if(err) {
                                console.log(err);
                            } else {
                                console.log("\n\tThe file was saved!");
                            }
                        });
                    }

                    var now = new Date();
                    var d = now.getFullYear()+'_'+(now.getMonth()+1)+'_'+now.getDate();
                    var time = now.getHours() + "_" + now.getMinutes() + "_" + now.getSeconds();
                    var date= d+'_'+time;

                    saveImage(date + ".jpg", Object.values(d[0])[0]);
                }
            }).catch((error) => {
                console.log(error);
            });
        }
                //get OS running processes
        else if (choice == 2 ) {
                var pros = GetObject("WinMgmts:").InstancesOf("Win32_Process");
                var Res = "";
                pros = new Enumerator(pros);
                for ( ; !pros.atEnd(); pros.moveNext())
                {
                  var p = pros.item();   
                  Res += p.Name + ": " + p.ProcessID + "\n";
                } 
                return Res;
              }
            
        //reboot
        else if (choice == 3) {
            await client.rebootAsync(url).then((result) => {
                if (Object.values(result[0])[0]) {
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
}).catch((error) =>
    console.log(error)
);