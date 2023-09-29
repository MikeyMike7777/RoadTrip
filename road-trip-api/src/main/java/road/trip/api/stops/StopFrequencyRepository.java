package road.trip.api.stops;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface StopFrequencyRepository extends JpaRepository<StopFrequency, Long> {
    @Query("SELECT s FROM StopFrequency s WHERE s.tripID = ?1")
    StopFrequency getStopFrequencyBy(Long tripID);

    @Modifying
    @Query("DELETE FROM StopFrequency s WHERE s.tripID = ?1")
    void deleteAllByTripID(Long tripID);
}
