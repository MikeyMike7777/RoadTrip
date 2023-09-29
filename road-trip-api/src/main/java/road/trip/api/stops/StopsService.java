package road.trip.api.stops;

import okhttp3.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.core.env.StandardEnvironment;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.List;
import java.util.Set;

@Service
public class StopsService {

    @Autowired
    public Environment env = new StandardEnvironment();

    @Autowired
    private StopFrequencyRepository stopFrequencyRepository;

    @Autowired
    private StopRepository stopRepository;

    @Transactional
    public StopFrequency addStopFrequency(StopFrequency stopFreq) {
        return stopFrequencyRepository.save(stopFreq);
    }

    @Transactional
    public StopFrequency getStopFrequency(String id) {
        return stopFrequencyRepository.getStopFrequencyBy(Long.valueOf(id));
    }

    @Transactional
    public Stop storeStop(Stop stop) {
        return stopRepository.save(stop);
    }

    @Transactional
    public void removeStop(String id) {
        stopRepository.deleteById(Long.valueOf(id));
    }

    @Transactional
    public String fetchStops(String id) {
        List<Stop> stops = stopRepository.fetchStops(Long.valueOf(id));
        StringBuilder result = new StringBuilder();
        result.append("[");
        for (int i = 0; i < stops.size(); ++i) {
            Stop stop = stops.get(i);
            if (i != 0) {
                result.append(", ");
            }
            OkHttpClient client = new OkHttpClient().newBuilder()
                    .build();
            Request request = new Request.Builder()
                    .url("https://api.yelp.com/v3/businesses/search?" +
                            "latitude=" + stop.latitude +
                            "&longitude=" + stop.longitude +
                            "&term=" + stop.name.replace(" ", "%20") +
                            "&radius=300" + "&limit=1")
                    .get()
                    .addHeader("accept", "application/json")
                    .addHeader("Authorization", "Bearer " +
                            env.getProperty("api.yelp.key"))
                    .build();
            Response response;
            try {
                response = client.newCall(request).execute();
                if (response.body() != null) {
                    result.append(response.body().string().substring(16)
                            .replaceAll("}], \"total.*}}}", ""));
                    result.append(", \"stopID\": ").append(stop.stopID).append("}");
                    response.close();
                }
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        }
        result.append("]");
        return result.toString();
    }

    public String findStop(Set<String> categories, List<String> lats, List<String> lons) {
        StringBuilder result = new StringBuilder();
        result.append("[");
        for (int i = 0; i < lats.size(); ++i) {
            if (i != 0) {
                result.append(", ");
            }
            OkHttpClient client = new OkHttpClient().newBuilder()
                    .build();
            Request request = new Request.Builder()
                    .url("https://api.yelp.com/v3/businesses/search?" +
                            "latitude=" + lats.get(i) +
                            "&longitude=" + lons.get(i) +
                            setToUrl(categories) +
                            "&sort_by=review_count&limit=10")
                    .get()
                    .addHeader("accept", "application/json")
                    .addHeader("Authorization", "Bearer " +
                            env.getProperty("api.yelp.key"))
                    .build();
            Response response;
            try {
                response = client.newCall(request).execute();
                if (response.body() != null) {
                    result.append(response.body().string().substring(16)
                            .replaceAll("], \"total.*}}}", ""));
                    response.close();
                }
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        }
        result.append("]");
        return result.toString();
    }

    @Transactional
    public boolean deleteTrip(String tripID) {
        try {
            stopFrequencyRepository.deleteAllByTripID(Long.valueOf(tripID));
            stopRepository.deleteAllByTripID(Long.valueOf(tripID));
        } catch (Exception ex) {
            ex.printStackTrace();
            return false;
        }
        return true;
    }

    private String setToUrl(Set<String> list) {
        StringBuilder url = new StringBuilder();

        for (String param : list)
            url.append("&categories=").append(param);

        return url.toString();
    }
}
