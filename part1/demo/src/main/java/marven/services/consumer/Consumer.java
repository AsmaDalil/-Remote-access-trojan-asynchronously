package marven.services.consumer;

public class Consumer {
    
    public static void main(String[] args){

        RemoteAccessService service = new RemoteAccessService();
        
        RemoteControl remoteControl = service.getRemoteControlPort();

        System.out.println(remoteControl.getOsName());
    }
}

