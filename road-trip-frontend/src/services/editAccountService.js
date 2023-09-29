import axios from 'axios';

function modifyUsers(props) {
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

function deleteUsers(props) {
    const data = {
        firstName: props.curF,
        lastName: props.curL,
        email: props.curEmail,
        phone: props.curPhone,
        password: props.curPassword
    }
    axios.post(process.env.ROAD_TRIP_API_URL + '/user/delete', data)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
}

export {modifyUsers, deleteUsers}