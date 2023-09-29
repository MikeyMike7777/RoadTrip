package road.trip.api.stops;


import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = StopFrequency.TABLE_NAME)
public class StopFrequency {
    public static final String TABLE_NAME = "StopFrequency";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "stopFreqID")
    Long stopFreqID;

    @Column(name = "tripID")
    Long tripID;

    @Column(name = "stopFreq")
    Integer stopFreq;

    @Column(name = "artistic")
    Boolean artistic;

    @Column(name = "beauty")
    Boolean beauty;

    @Column(name = "food")
    Boolean food;

    @Column(name = "fun")
    Boolean fun;

    @Column(name = "historical")
    Boolean historical;

    @Column(name = "landmarks")
    Boolean landmarks;

    @Column(name = "nature")
    Boolean nature;

    @Column(name = "water")
    Boolean water;
}
