package road.trip.api.trip;

import lombok.Data;

import javax.persistence.*;
import java.sql.Date;

@Data
@Entity
@Table(name = Trip.TABLE_NAME)
public class Trip {

    public static final String TABLE_NAME = "Trip";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tripID")
    Long tripID;

    @Column(name = "tripName")
    String tripName;

    @Column(name = "email")
    String email;

    @Column(name = "startDate")
    Date startDate;

    @Column(name = "startLoc")
    String startLoc;

    @Column(name = "endLoc")
    String endLoc;

    @Column(name = "rating")
    Integer rating;

    @Column(name = "description")
    String description;

    @Column(name = "tripTime")
    Long tripTime;

    @Column(name = "tripDist")
    Float tripDist;
}
