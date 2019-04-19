import axios from 'axios';

function userLogin(data) {
    try {
        //  console.log("data in user services-->", data);
        return axios.post('/Login', data);
    } catch (error) {
        console.log("error in userlogin in userservices");

    }
}

function userRegister(data) {
    try {
        console.log("data in user services-->", data);

        return axios.post('/Register', data);
    } catch (error) {
        console.log("error in user registration in userservices ");
    }
}

function verfyemail(data) {
    try {
        return axios.post('/forgetpassword', data);
    } catch (error) {
        console.log("Error in verifyemail  in userservices ");

    }
}

function resetpassword(data, token) {
    try {
        return axios.post(`/reset/${token}`, data, { headers: { 'token': token } })
    } catch (error) {
        console.log("Error in resetpassword in userservices..");

    }
}

export function  uploadProfilePic(data) {
    console.log("hai data", data);

    return axios.put('/setProfilePic',data, {
        headers: { 'token': localStorage.getItem('token')}

    })
}

export function  deleteredis(data) {
   // console.log("hai data", data);

    return axios.post('/logout',data, {
        headers: { 'token': localStorage.getItem('token')}

    })
}

export {
    userLogin,
    userRegister,
    verfyemail,
    resetpassword
}