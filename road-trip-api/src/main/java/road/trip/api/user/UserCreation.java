package road.trip.api.user;

public class UserCreation {
    private String nameF;

    private String nameL;

    private String email;

    private String phone;

    private String password;

    public UserCreation(){

    }

    public UserCreation(String nameF, String nameL) {
        this.nameF = nameF;
        this.nameL = nameL;
    }

    public UserCreation(String nameF, String nameL, String email, String phone, String password) {
        this.nameF = nameF;
        this.nameL = nameL;
        this.email = email;
        this.phone = phone;
        this.password = password;
    }

    public String getNameF() {
        return nameF;
    }

    public void setNameF(String name) {
        this.nameF = name;
    }

    public String getNameL() {
        return nameL;
    }

    public void setNameL(String name) {
        this.nameL = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
