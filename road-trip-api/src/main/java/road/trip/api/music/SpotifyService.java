package road.trip.api.music;

import com.fasterxml.jackson.databind.ObjectMapper;
import kotlin.text.Charsets;
import lombok.Data;
import okhttp3.*;
import org.apache.logging.log4j.util.Strings;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.*;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.io.IOException;
import java.net.URI;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
public class SpotifyService {
    private static final String CLIENT_ID = "b8b6147b93f34b898aef26987025e73e";
    private static final String CLIENT_SECRET = "8a29110b97a14ff4990ef8934f7ec1e8";
    private final ObjectMapper objectMapper = new ObjectMapper();

    public static class AuthResponse{
        private String access_token;
        private String token_type;
        private Integer expires_in;

        public AuthResponse() {
            access_token = null;
            token_type = null;
            expires_in = null;
        }

        public String getAccess_token() {
            return access_token;
        }

        public void setAccess_token(String access_token) {
            this.access_token = access_token;
        }

        public String getToken_type() {
            return token_type;
        }

        public void setToken_type(String token_type) {
            this.token_type = token_type;
        }

        public Integer getExpires_in() {
            return expires_in;
        }

        public void setExpires_in(Integer expires_in) {
            this.expires_in = expires_in;
        }

        @Override
        public String toString() {
            return "AuthResponse{" +
                    "access_token='" + access_token + '\'' +
                    ", token_type='" + token_type + '\'' +
                    ", expires_in=" + expires_in +
                    '}';
        }
    }

    private static AuthResponse authResponse;

    static{
        authResponse = null;
    }

    public AuthResponse getAuth(){
        if(authResponse == null){
            authResponse = doAuthFlow();
        }
        return authResponse;
    }

    public AuthResponse doAuthFlow() {
        AuthResponse authResponse = null;
        try {
            String url = "https://accounts.spotify.com/api/token";
            HttpHeaders headers = new HttpHeaders();

            //create auth string must be encoded base 64
            String auth = CLIENT_ID + ":" + CLIENT_SECRET;
            String encoded = Base64.getEncoder().encodeToString(auth.getBytes(Charsets.UTF_8));

            headers.setBasicAuth(encoded);
            //headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
            MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
            body.add("grant_type", "client_credentials");

            HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);
            RestTemplate restTemplate = new RestTemplate();
            String result = null;

            try {
                //result = restTemplate.postForObject(url, request, String.class);
                authResponse = restTemplate.postForObject(url, request, AuthResponse.class);
            } catch (org.springframework.web.client.RestClientException rce) {
                System.out.println(request.toString());
                System.out.println(rce.toString());
                rce.printStackTrace();
            }
            System.out.println(authResponse);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("oh no");
        }
        return authResponse;
    }

    public RecommendationsBuilder getRecommendationBuilder(){
        return new RecommendationsBuilder();
    }

    public class RecommendationsBuilder{
        private final static int MAX_SEEDS = 5;
        private final static int MIN_LIMIT = 1;
        private final static int MAX_LIMIT = 100;
        Map<String, String> params;
        int seedArtistCount;
        int seedTracksCount;
        int seedGenresCount;
        public RecommendationsBuilder(){
            params = new LinkedHashMap<String, String>();
            params.put("market", "US");
            params.put("limit", "10");
            seedArtistCount = 0;
            seedTracksCount = 0;
            seedGenresCount = 0;

        }

        int getSeedCount(){
            return seedArtistCount + seedGenresCount + seedTracksCount;
        }

        public RecommendationsBuilder limit(int limit){
            if(limit <= MAX_LIMIT && limit >= MIN_LIMIT){
                params.put("limit", String.valueOf(limit));
            }
            return this;
        }

        public RecommendationsBuilder seedArtist(List<String> artists){
            if(artists.size() + seedTracksCount + seedGenresCount <= MAX_SEEDS && artists.size() > 0){
                params.put("seed_tracks", Strings.join(artists, ','));
                seedArtistCount = artists.size();
            }
            return this;
        }

        public RecommendationsBuilder seedTracks(List<String> tracks){
            if(tracks.size() + seedArtistCount + seedGenresCount <= MAX_SEEDS && tracks.size() > 0){
                params.put("seed_tracks", Strings.join(tracks, ','));
                seedTracksCount = tracks.size();
            }
            return this;
        }

        public RecommendationsBuilder seedGenres(List<String> genres){
            if(genres.size() + seedArtistCount + seedTracksCount <= MAX_SEEDS && genres.size() > 0){
                params.put("seed_genres", Strings.join(genres, ','));
                seedGenresCount = genres.size();
            }
            return this;
        }

        public List<SpotifyService.SpotifyTrack> get(){
            String response = SpotifyService.this.get("recommendations", params);
            JSONObject jsonOBJ = null;
            List<SpotifyTrack> out = null;
            try {
                jsonOBJ = new JSONObject(response);
                JSONArray tracks = jsonOBJ.getJSONArray("tracks");
                out = IntStream.range(0, tracks.length()).mapToObj(i-> {
                    try {
                        return new SpotifyTrack( tracks.getJSONObject(i));
                    } catch (JSONException e) {
                        return null;
                    }
                }).filter(s -> s != null).collect(Collectors.toList());

            } catch (JSONException e) {
                throw new RuntimeException(e);
            }
            return out;
        }
    }

    @Data
    @Entity
    public static class SpotifyTrack{
        @Column
        String uri;
        @Id
        String id;

        @Column
        String trackName;

        @Column
        String albumName;

        @Column
        String albumImageURI;

        @Column
        Integer albumImageHeight;

        @Column
        Integer albumImageWidth;
        public SpotifyTrack(JSONObject jsonIn) throws JSONException {
            id = jsonIn.getString("id");
            uri = jsonIn.getString("uri");
            trackName = jsonIn.getString("name");
            try{
                JSONObject album = jsonIn.getJSONObject("album");
                try{
                    albumName = album.getString("name");
                }catch (JSONException je){
                    albumName = null;
                }
                try{
                    JSONArray images = album.getJSONArray("images");
                    if(images.length() > 0){
                        JSONObject image = images.getJSONObject(0);
                        albumImageURI = image.getString("url");
                        albumImageHeight = image.getInt("height");
                        albumImageWidth = image.getInt("width");
                    }
                    else{
                        albumImageURI = null;
                        albumImageWidth = null;
                        albumImageHeight = null;
                    }
                }
                catch (JSONException je){
                    albumImageURI = null;
                    albumImageWidth = null;
                    albumImageHeight = null;
                }
            }catch (JSONException jse){
                System.out.println("ahhhhhhhhhhhhhhh");
                albumName = null;
                albumImageURI = null;
                albumImageHeight = null;
                albumImageWidth = null;
            }

        }

        public SpotifyTrack() {
            id = null;
            uri = null;
            trackName = null;
            albumName = null;
            albumImageURI = null;
            albumImageHeight = null;
            albumImageWidth = null;
        }

        @Override
        public String toString() {
            return "\nSpotifyTrack{" +
                    "uri='" + uri + '\'' +
                    ", id='" + id + '\'' +
                    ", trackName='" + trackName + '\'' +
                    ", albumName='" + albumName + '\'' +
                    ", imageURI='" + albumImageURI + '\'' +
                    ", imageHeight=" + albumImageHeight +
                    ", imageWidth=" + albumImageWidth +
                    '}';
        }
    }

    public List<String> getAvaliableGenreSeeds(){
        String json_response = get("/recommendations/available-genre-seeds", null);
        List<String> out = null;
        try {
            JSONObject jsonOBJ = new JSONObject(json_response);
            JSONArray jarr = jsonOBJ.getJSONArray("genres");
            out = IntStream.range(0, jarr.length()).mapToObj(i-> {
                try {
                    return jarr.getString(i);
                } catch (JSONException e) {
                    return null;
                }
            }).filter(s -> s != null).collect(Collectors.toList());

        } catch (JSONException e) {
            throw new RuntimeException(e);
        }
        return out;
    }

    public String get(String spEndpoint, Map<String, String> queryParams){
        String out = null;
        AuthResponse ar = this.getAuth();
        if(ar == null){
            throw new RuntimeException("Spotify Auth was not found");
        }
        String token = ar.getAccess_token();
        try {
            String url = "https://api.spotify.com/v1/" + spEndpoint;
            UriComponentsBuilder uriComponentsBuilder = UriComponentsBuilder.fromUriString(url);
            if(queryParams != null){
                for(String key: queryParams.keySet()){
                    uriComponentsBuilder = uriComponentsBuilder.queryParam(key, queryParams.get(key));
                }
            }
            URI uri = uriComponentsBuilder.build().toUri();

            HttpHeaders headers = new HttpHeaders();
            headers.setAccept(List.of(MediaType.APPLICATION_JSON));
            headers.setContentType(MediaType.APPLICATION_JSON);

            headers.setBearerAuth(token);

            HttpEntity<Void> request = new HttpEntity<>(headers);
            RestTemplate restTemplate = new RestTemplate();

            AuthResponse authResponse = null;
            try {
                ResponseEntity<String> response = restTemplate.exchange(uri, HttpMethod.GET, request, String.class);
                out = response.getBody();
            } catch (org.springframework.web.client.RestClientException rce) {
                System.out.println(request.toString());
                System.out.println(rce.toString());
                rce.printStackTrace();
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("oh no problem in request");
        }
        return out;
    }
}
