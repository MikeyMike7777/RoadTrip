package road.trip.api.music;

import lombok.extern.log4j.Log4j2;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import road.trip.api.music.MusicService;

import java.util.List;

@Log4j2
@RestController
public class MusicEndpoint {
    @Autowired
    private MusicService musicService;

    @Autowired
    private SpotifyService spotifyService;

    @CrossOrigin
    @GetMapping("/doauth")
    String doAuth(){
        SpotifyService.AuthResponse ar = spotifyService.getAuth();
        //List<SpotifyService.SpotifyTrack> out = spotifyService.getRecommendationBuilder().seedGenres(List.of("country")).get(ar.getAccess_token());
        //List<String> out = spotifyService.getAvaliableGenreSeeds(ar.getAccess_token());
        //String out = spotifyService.get("artists/4Z8W4fKeB5YxbusRsdQVPb", ar.getAccess_token(), null);
        System.out.println(ar);
        return "done";
    }

    @CrossOrigin
    @GetMapping("/music/recommendations")
    List<SpotifyService.SpotifyTrack> getRecommendations(){
        return spotifyService.getRecommendationBuilder().seedGenres(List.of("country")).get();
    }

    @CrossOrigin
    @GetMapping("/music/recommendations/{genre}")
    List<SpotifyService.SpotifyTrack> getGenreRec(@PathVariable String genre){
        return spotifyService.getRecommendationBuilder().seedGenres(List.of(genre)).get();
    }

}
