package road.trip.api.user;

import javax.persistence.*;

import lombok.Data;

@Data
@Entity
@Table(name = User.TABLE_NAME)
public class User {
    public static final String TABLE_NAME = "User";

    @Id
    @Column(name = "email")
    String email;

    @Column(name = "firstName")
    String firstName;

    @Column(name = "lastName")
    String lastName;

    @Column(name = "phone")
    String phone;

    @Column(name = "password")
    String password;

    @Column(name = "k")
    String key;

    @Override
    public String toString() {
        return "User{" +
                "firstName='" + firstName + '\'' +
                "lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
