package road.trip.api.maps;

import okhttp3.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.core.env.StandardEnvironment;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class MapsService {

    @Autowired
    public Environment env = new StandardEnvironment();

    Pair<Boolean, String> findAddress(String location) {
        OkHttpClient client = new OkHttpClient().newBuilder()
                .build();
        Request request = new Request.Builder()
                .url("https://maps.googleapis.com/maps/api/place/textsearch/json?" +
                        "query=" + location + "&key=" +
                        env.getProperty("api.maps.key"))
                .method("GET", null)
                .build();
        Response response;
        try {
            response = client.newCall(request).execute();
            String result = "";
            if (response.body() != null) {
                result = response.body().string()
                        .replaceAll("\\n {0,5}", "")
                        .replaceAll("\" ?", "'")
                        .replaceAll(" {3,5}", "");
            }
            response.close();

            if (result.contains("}, {")) {
                return Pair.of(false, "Too many results for \"" + location + "\".");
            } else if (result.contains("ZERO_RESULTS")) {
                return Pair.of(false, "No results for \"" + location + "\".");
            }

            return Pair.of(true, result.substring(
                    result.indexOf("'formatted_address': '") + 22,
                    result.indexOf("','geometry'")));
        } catch (IOException ex) {
            ex.printStackTrace();
        }

        return Pair.of(false, "Maps search error. Please try again.");
    }

    Pair<Boolean, String> findLoc(String location) {
        OkHttpClient client = new OkHttpClient().newBuilder()
                .build();
        Request request = new Request.Builder()
                .url("https://maps.googleapis.com/maps/api/place/textsearch/json?" +
                        "query=" + location + "&key=" +
                        env.getProperty("api.maps.key"))
                .method("GET", null)
                .build();
        Response response;
        try {
            response = client.newCall(request).execute();
            String result = "", trueResult = "";
            if (response.body() != null) {
                trueResult = response.body().string();
                result = trueResult
                        .replaceAll("\\n {0,5}", "")
                        .replaceAll("\" ?", "'")
                        .replaceAll(" {3,5}", "");
            }
            response.close();

            if (result.contains("}, {")) {
                return Pair.of(false, "Too many results for \"" + location + "\".");
            } else if (result.contains("ZERO_RESULTS")) {
                return Pair.of(false, "No results for \"" + location + "\".");
            }

            return Pair.of(true, trueResult);
        } catch (IOException ex) {
            ex.printStackTrace();
        }

        return Pair.of(false, "Maps search error. Please try again.");
    }

    public String getDirections(String start, String end) {
        start = start.replace(' ', '+');
        end = end.replace(' ', '+');
        OkHttpClient client = new OkHttpClient().newBuilder()
                .build();
        Request request = new Request.Builder()
                .url("https://maps.googleapis.com/maps/api/directions/json?" +
                        "origin=" + start +
                        "&destination=" + end +
                        "&key=" + env.getProperty("api.maps.key"))
                .method("GET", null)
                .build();
        Response response;
        try {
            response = client.newCall(request).execute();
            String result = "";
            if (response.body() != null) {
                result = response.body().string();
            }
            response.close();
            return result;
        } catch (IOException ex) {
            ex.printStackTrace();
        }
        return "error";
    }
}
