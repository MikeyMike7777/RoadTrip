package road.trip.api.trip;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TripRepository extends JpaRepository<Trip, Long> {

    @Query("SELECT t FROM Trip t WHERE t.email LIKE ?1")
    List<Trip> findTripsByEmail(String email);

    @Query("SELECT t FROM Trip t WHERE t.tripName LIKE %?1%")
    List<Trip> findTripsByName(String tripName);

    @Query("SELECT t FROM Trip t WHERE t.tripID = ?1")
    Trip findTripsByID(Long tripID);

    @Modifying
    @Query("UPDATE Trip t SET t.rating = :rating, t.description = :description WHERE t.tripID = :tripID")
    void saveRating(@Param("tripID") Long tripID, @Param("rating") Integer rating, @Param("description") String description);

}
