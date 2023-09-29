package road.trip.api.stops;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@Log4j2
@RestController
public class StopsEndpoint {

    final private Map<String, List<String>> categories = Map.of("artistic",
            artistic, "beauty", beauty, "food", food,
            "fun", fun, "historical", historical, "landmarks",
            landmark, "nature", nature, "water", water);
    final private static List<String> artistic = List.of("arts",
            "movietheaters", "tradefairs", "artmuseums", "artsandcrafts",
            "media", "tattoo", "arttours", "architecturetours", "publicart");
    final private static List<String> beauty = List.of("spas", "hair",
            "hotsprings", "massage", "othersalons", "piercing", "tanning",
            "tattoo", "fashion", "shopping");
    final private static List<String> food = List.of("breweries", "gourmet",
            "wineries", "eatertainment", "farmersmarket", "foodtours",
            "winetours");
    final private static List<String> fun = List.of("active", "diving",
            "fitness", "movietheaters", "festivals", "bicycles", "localflavor",
            "sportgoods", "spas", "piercing", "hotsprings");
    final private static List<String> historical = List.of("museums",
            "historicaltours", "landmarks");
    final private static List<String> landmark = List.of("landmarks",
            "giftshops", "cablecars", "ferries");
    final private static List<String> nature = List.of("parks", "farms",
            "campgrounds", "sportgoods", "gardens", "rockclimbing", "hiking",
            "canyoneering", "beaches", "zoo", "aquarium", "hotsprings");
    final private static List<String> water = List.of("diving", "hotsprings",
            "ferries", "aquariums", "bathing_area", "beaches", "boating",
            "fishing", "jetskis", "lakes", "paddleboarding", "paragliding",
            "rafting", "sailing", "snorkeling", "surfing", "swimmingpools",
            "tubing", "waterparks", "boattours", "whalewatchingtours");

    @Autowired
    private StopsService stopsService;

    @CrossOrigin
    @PostMapping("/stops")
    public StopFrequency addStopFrequency(@RequestBody StopFrequency stopFreq) {
        return stopsService.addStopFrequency(stopFreq);
    }

    @CrossOrigin
    @GetMapping("/stops/{id}")
    public StopFrequency getStopFrequency(@PathVariable String id) {
        return stopsService.getStopFrequency(id);
    }

    @CrossOrigin
    @GetMapping("/allCategories")
    public Set<String> getCategories() {
        return categories.keySet();
    }

    @CrossOrigin
    @GetMapping("/findStop/{categories}/{lat}/{lon}")
    public String findStop(@PathVariable String categories,
                           @PathVariable String lat,
                           @PathVariable String lon) {
        Set<String> types = new HashSet<>();
        String[] temp = categories.split("\\+");
        for (String s : temp)
            types.addAll(this.categories.get(s));
        String[] lats = lat.split("\\+");
        String[] lons = lon.split("\\+");
        return stopsService.findStop(types, List.of(lats),
                List.of(lons));
    }

    @CrossOrigin
    @GetMapping("/fetchStops/{id}")
    public String fetchStops(@PathVariable String id) {
        return stopsService.fetchStops(id);
    }

    @CrossOrigin
    @PostMapping("/storeStop")
    public Stop storeStop(@RequestBody Stop stop) {
        return stopsService.storeStop(stop);
    }

    @CrossOrigin
    @PostMapping("/removeStop/{id}")
    public void removeStop(@PathVariable String id) {
        stopsService.removeStop(id);
    }

    @CrossOrigin
    @DeleteMapping("/stop/cancel/{tripID}")
    public boolean deleteTrip(@PathVariable String tripID) {
        return stopsService.deleteTrip(tripID);
    }
}
