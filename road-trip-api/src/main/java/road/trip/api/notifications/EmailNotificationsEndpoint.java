package road.trip.api.notifications;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;
import java.io.IOException;

@Log4j2
@RestController
public class EmailNotificationsEndpoint {
    @Autowired
    public EmailNotificationService emailService;

    @RequestMapping("/notification/{email}+{type}")
    @CrossOrigin
    public void sendEmailNotification(@PathVariable String email, @PathVariable String type)
            throws AddressException, MessagingException, IOException {
        String message = "";
        ///TODO: MAKE TYPE AN ENUM OR CHANGE HOW NOTIFICATIONS WORK
        switch (type) {
            case "Test":
                message = "This is a test notification";
                break;
            case "Login":
                message = "Someone has Logged into your account.";
                break;
            case "Upcoming":
                break;
            case "Late":
                break;
            default:
        }
            emailService.sendmail(email,type, message);

        /*catch(AddressException ae)
        {
            System.out.println("Address Exception: " + ae.getMessage());
            ae.printStackTrace();
        }
        catch(MessagingException m)
        {
            System.out.println("Message Exception: " + m.getMessage());
            m.printStackTrace();
        }
        catch(IOException ioe)
        {
            System.out.println("General IO Exception: " + ioe.getMessage());
            ioe.printStackTrace();
        }*/
    }
}
