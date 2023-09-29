package road.trip.api.user;

import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UserCreationRowMapper implements RowMapper<UserCreation>{
    public UserCreation mapRow(ResultSet rs, int rowNum) throws SQLException {
        UserCreation a = new UserCreation();

        String name = rs.getString("First Name");
        System.out.println("Name: " + name);
        a.setNameF(name);

        String nameL = rs.getString("Last Name");
        System.out.println("Last Name: " + nameL);
        a.setNameL(nameL);

        String email = rs.getString("Email");
        System.out.println("Email: " + email);
        a.setEmail(email);

        String phone = rs.getString("Phone Number");
        System.out.println("Phone: " + phone);
        a.setPhone(phone);

        String password = rs.getString("Password");
        System.out.println("Password: " + password);
        a.setPassword(password);

        return a;
    }
}
