package road.trip.api.stops;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = Stop.TABLE_NAME)
public class Stop {
    public static final String TABLE_NAME = "Stop";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "stopID")
    Long stopID;

    @Column(name = "tripID")
    Long tripID;

    @Column(name = "latitude")
    Double latitude;

    @Column(name = "longitude")
    Double longitude;

    @Column(name = "arrivalTime")
    Long arrivalTime;

    @Column(name = "name")
    String name;
}
