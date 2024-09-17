package part2;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import java.io.*;
import java.util.Base64;
import java.awt.*;
import java.awt.image.BufferedImage;
import javax.imageio.*;

@RestController
@RequestMapping(path = "/remote")


public class RemoteAccess {

    public @ResponseBody String getCapture(){
        try{
            System.setProperty("java.awt.headless", "false");

            Rectangle Screen = new Rectangle(java.awt.Toolkit.getDefaultToolkit().getScreenSize());
            BufferedImage capture = new Robot().createScreenCapture(screen);

            ByteArrayOutputStream baos = new ByteArrayOutputStream();

            ImageIO.write(capture, "jpg", baos );

            byte[] bytes = baos.toByteArray();
            return Base64.getEncoder().encodeToString(bytes);
        }catch(Exception e){
            return null;
        }
    }
    @GetMapping(path = "/list")
    public @ResponseBody String List(){
        try{

            List<String> processList = new ArrayList<>();

            ProcessBuilder pb = new ProcessBuilder("tasklist");
            Process process = pb.start();
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                processList.add(line);
            }
            
            return System.getProperty("processList");
        }
        catch(Exception e){
            return false;
        }
    }

   
    
 @GetMapping(path = "/restart")
    public @ResponseBody boolean restart(){
        try{
            Runtime runtime = Runtime.getRuntime();
            String os = System.getProperty("os.name").toLowerCase();
            if(os.contains("windows")){
                runtime.exec("shutdown -r -t 0"); //-r for restart and -s for shutting down
            }else if(os.contains("linux") || os.contains("mac os x")){
                runtime.exec("shutdown -r now"); //-r for restart, -h for shutting down, and -s for sleep
            }
            //System.exit(0); //removed to avoid error on the consumer side waiting for a reply
            return true;
        } catch(Exception e){
            return false;
        }
    }
 }

