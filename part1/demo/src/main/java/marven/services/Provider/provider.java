package marven.services.Provider;
import javax.xml.ws.Endpoint;

public class provider {
     //define the address where the server/service will be reachable
        // we add RemoteAccess to specify which service, since the server might be exposing multiple services
        private static final String url = "http://localhost:8080/RemoteAccess";
    
        public static void main(String arg[]) throws Exception{
    
            RemoteAccess remoteAccess = new RemoteAccess();

            System.out.println("Publishing the remote access system");
            Endpoint.publish(URL, remoteAccess);
            System.out.println("Remote access system Published");
    
        }
    
}
