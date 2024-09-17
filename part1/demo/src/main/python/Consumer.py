from unittest import case
import PIL.Image as Image
import io
from zeep import Client
from datetime import datetime

RemoteAccess = Client('src/main/resources/RemoteAccessService.wsdl').service

Choice = 0

while(1 and Choice != 4):
#Menu
print("Please enter your prefered choice: \n")
print("\t1   : To list the processes running in the remote system \n")
print("t'2'  :To get the screenshot of the remote system \n")
print("\t'3' : To reboot the remote system \n")
print("\t'4' : To quit \n")
Choice = int(input("\tChoice: "))


if Choice == 1:    
        try:
                processes = RemoteAccess.getRunningProcess()
                for i in processes:
                    print(i)
                print("Operation successful ...")
        except:
                    print("Operation failed ...")

elif Choice == 2:
        try:
            
                ImageBytes = bytearray(RemoteAccess.GetCapture())
                image = Image.open(io.BytesIO(ImageBytes))
                now = datetime.now()
                dt_string = "my_scr" + now.strftime("%Y_%m_%d_%H_%M_%S") + ".jpg"
                image.save(dt_string)
                print("\n\tOperation successful!\n")
        except:
            print("\n\tOperation failed!\n")

elif Choice == 3:
       
        if not RemoteAccess.service.reboot():
            print("\n\tOperation failed!\n")

        else:
            print("\n\tOperation successful!\n")
            choice = 4
            
elif choice ==4:
        print("\n\tTerminated.\n")
    
else:
        print("\n\tWrong choice!\n")
