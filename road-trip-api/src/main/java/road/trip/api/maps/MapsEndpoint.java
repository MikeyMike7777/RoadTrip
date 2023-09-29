package road.trip.api.maps;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Log4j2
@RestController
public class MapsEndpoint {

    @Autowired
    private MapsService mapsService;

    @CrossOrigin
    @GetMapping("/locationSearch/{start}/{end}")
    public List<String> findAddress(@PathVariable String start, @PathVariable String end) {
        Integer result = 0;
        String begin;
        String finish;
        Pair<Boolean, String> p;
        if ((p = mapsService.findAddress(start)).getFirst()) {
            result += 1;
        }
        begin = p.getSecond();
        if ((p = mapsService.findAddress(end)).getFirst()) {
            result += 2;
        }
        finish = p.getSecond();
        return List.of(result.toString(), begin, finish);
    }

    @CrossOrigin
    @GetMapping("/locationSearch/{stop}")
    public String findAddress(@PathVariable String stop) {
        return mapsService.findLoc(stop).getSecond();
    }

    @CrossOrigin
    @GetMapping("/directions/{start}/{end}")
    public String getDirections(@PathVariable String start, @PathVariable String end) {
        return mapsService.getDirections(start, end);
    }
}
