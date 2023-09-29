import {useEffect, useState} from "react";
import axios from "axios";
import SpotifyPlayer from "./SpotifyPlayer";

export default function MusicRecommendations(props){


    const DEFAULT_GENRE = "country"


    const [tracks, setTracks] = useState([])

    const [genre, setGenre] = useState(DEFAULT_GENRE)


    const renderTracks = () => {
        return tracks.map(track => (
            <div key={track.id}>
                <SpotifyPlayer uri={track.uri}/>
            </div>
        ));
    }

    const logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
    }

    const getTracks = () => {
        let result = null
        let err = false

        axios.get(process.env.ROAD_TRIP_API_URL + '/music/recommendations/' + ((genre === "") ? DEFAULT_GENRE:genre.toLowerCase()))
            .then(response => {
                console.log(response.data);
                result = response.data;
                setTracks(result)
            })
            .catch(error => {
                console.error(error);
                err = true;
            });

    }

    function updateGenre(event){
        setGenre(event.target.value)
    }

    const HeaderStyle = {
        position: "fixed",
        top: "200",
        left: "0",
        zIndex: "999",
        width: "100%",
        //height: "23px",
    };

    const BelowHeaderStyle = {

        margin: "auto",
        width: "50%",
        padding: "10px",
    }

    return (<div className="Music">

        <header className="Music-Recommendation-header" style={HeaderStyle}>
            <h1>Music Recommendations</h1>

        <section>
            Genre: <input onInput={updateGenre} defaultValue={genre}/>
            <button className='button' onClick={getTracks}> Make Play List </button>
        </section>
        </header>
        <section style={BelowHeaderStyle}>
            {renderTracks()}
        </section>



    </div>);
}