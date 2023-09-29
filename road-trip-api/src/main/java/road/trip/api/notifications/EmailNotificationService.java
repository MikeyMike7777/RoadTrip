package road.trip.api.notifications;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.core.env.StandardEnvironment;
import org.springframework.stereotype.Service;

import javax.mail.*;
import javax.mail.internet.*;
import java.io.IOException;
import java.util.Date;
import java.util.Properties;

@Service
public class EmailNotificationService {

    @Autowired
    public Environment env = new StandardEnvironment();

    public void sendmail(String to, String subject,String content) throws IOException, AddressException, MessagingException
    {
        Properties props = new Properties();
        props.put("mail.smtp.host", "smtp.office365.com");//"smtp-mail.outlook.com");
        props.put("mail.smtp.port", "587");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.starttls.required", "true");

        Session session = Session.getInstance(props, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(env.getProperty("spring.mail.username"),
                                                    env.getProperty("spring.mail.password"));
            }
        });
        session.setDebug(true);

        Message msg = new MimeMessage(session);
        msg.setFrom(new InternetAddress(env.getProperty("spring.mail.username")));

        ///TODO: CHANGE THE BAYLOR EMAIL TO BE THE EMAIL STRING
        msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to.toString()));
        msg.setSubject("Login");//subject);
        msg.setContent("Someone has Logged into your account.", "text/html; charset=utf-8");//content, "text/html; charset=utf-8");
        msg.setSentDate(new Date());

        MimeBodyPart messageBodyPart = new MimeBodyPart();
        messageBodyPart.setContent("Someone has Logged into your account.", "text/html; charset=utf-8");//content, "text/html; charset=utf-8");

        Multipart multipart = new MimeMultipart();
        multipart.addBodyPart(messageBodyPart);

        msg.setContent(multipart);
        Transport.send(msg);
    }
}
