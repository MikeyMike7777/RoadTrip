package road.trip.api.stops;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StopRepository extends JpaRepository<Stop, Long> {
    @Query("SELECT s FROM Stop s WHERE s.tripID = ?1")
    List<Stop> fetchStops(Long tripID);

    @Modifying
    @Query("DELETE FROM Stop s WHERE s.tripID = ?1")
    void deleteAllByTripID(Long tripID);

}
