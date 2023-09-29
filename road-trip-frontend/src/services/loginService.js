import axios from 'axios';

export async function loginUsers(props) {
    const response = await axios.get(process.env.ROAD_TRIP_API_URL + '/user/' + props.email)
    return response.data
}

export async function validatePassword(props){
    console.log(props.password);
    const response = await axios.get(process.env.ROAD_TRIP_API_URL + '/user/validate/' + props.email +'/'+ props.password)
    return response.data;

}
