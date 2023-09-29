import axios from 'axios';

export default function registerUsers(props) {
    console.log("Registering...")
    const data = {
        firstName: props.nameF,
        lastName: props.nameL,
        email: props.email,
        phone: props.phone,
        password: props.password
    }
    axios.post(process.env.ROAD_TRIP_API_URL + '/user', data)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
}

