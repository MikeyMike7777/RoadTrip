package road.trip.api.trip;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import lombok.extern.log4j.Log4j2;
import road.trip.api.user.User;

import java.util.List;

@Log4j2
@RestController
public class TripEndpoint {

    @Autowired
    private TripService tripService;

    @CrossOrigin
    @PostMapping("/trip")
    public Trip saveTrip(@RequestBody Trip trip) {
        return tripService.saveTrip(trip);
    }

    @CrossOrigin
    @GetMapping("/trip/{email}")
    public List<Trip> findTripByEmail(@PathVariable String email) {
        return tripService.findTripsByEmail(email);
    }

    @CrossOrigin
    @GetMapping("/trip/name/{tripName}")
    public List<Trip> findTripByName(@PathVariable String tripName) {
        return tripService.findTripsByName(tripName);
    }

    @CrossOrigin
    @DeleteMapping("/trip/cancel/{tripID}")
    public boolean cancelTrip(@PathVariable Long tripID) {
        Trip temp = findTripByID(tripID);
        return tripService.cancelTrip(temp);
    }

    @CrossOrigin
    @GetMapping("/rateTrip/{tripID}")
    public Trip findTripByID(@PathVariable Long tripID) {
        return tripService.findTripsByID(tripID);
    }

    @CrossOrigin
    @PostMapping("/rateTrip")
    public void saveRating(@RequestBody Trip trip){
        tripService.saveRating(trip);
    }
}
