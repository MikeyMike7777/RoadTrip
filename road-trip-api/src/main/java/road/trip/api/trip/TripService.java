package road.trip.api.trip;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TripService {

    @Autowired
    private TripRepository tripRepository;

    @Transactional
    public Trip saveTrip(Trip trip) {
        return tripRepository.save(trip);
    }

    @Transactional
    public boolean cancelTrip(Trip trip) {
        try {
            tripRepository.delete(trip);
        } catch (Exception ex) {
            ex.printStackTrace();
            return false;
        }
        return true;
    }

    @Transactional
    public List<Trip> findTripsByEmail(String email) { return tripRepository.findTripsByEmail(email); }

    @Transactional
    public List<Trip> findTripsByName(String tripName) { return tripRepository.findTripsByName(tripName); }

    @Transactional
    public Trip findTripsByID(Long tripID) { return tripRepository.findTripsByID(tripID); }

    @Transactional
    public void saveRating(Trip trip) { tripRepository.saveRating(trip.getTripID(), trip.getRating(), trip.getDescription());}
}
