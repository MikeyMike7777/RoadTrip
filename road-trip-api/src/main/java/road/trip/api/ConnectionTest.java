package road.trip.api;

import org.springframework.jdbc.datasource.DriverManagerDataSource;

import java.sql.SQLException;

public class ConnectionTest {
    public static void main(String[] args) {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
        dataSource.setUrl("jdbc:mysql://localhost:3306/test?createDatabaseIfNotExist=true");
        dataSource.setUsername("user");
        dataSource.setPassword("password");
        try {
            dataSource.getConnection();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
