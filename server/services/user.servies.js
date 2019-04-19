
const usermodels = require('../app/userModel');

/**
 * @description:login is used to check the data is present in database or not..
 * @param {request from front end} req 
 * @param {responce from backend} res 
 */
exports.loginusers = (req, res) => {
    try {
        usermodels.login(req, (err, data) => {

            if (err) {
                console.log("err in service..");

                res(err);
            }
            else {
                console.log("service is working fine");
                res(null, data);
            }

        })
    }
    catch (err) {
        console.log("error in services:",err);
        
    }

}
/**
 * @description:register is used to register the user data in database...
 */

exports.registers = (req, res) => {
    try {

        usermodels.registration(req, (err, data) => {

            if (err) {
                console.log("err in service..");

                res(err);

            }
            else {

                console.log("service is working fine");
                res(null, data);

            }



        })
    }
    catch (err) {
        console.log("error in services:",err);
      

    }
}
/**
 * @description:checkuser use to find the data is present or not...
 */
exports.checkuser = (data, callback) => {
    try {
        usermodels.checkvalid(data, (err, result) => {

            if (err) {
                console.log("service err");
                callback(err);
            }
            else {
                callback(null, result);
            }

        })
    }
    catch{
        console.log("error in services:",err);
        


    }
}


/**
 * @description:setpas is used to update the password in database...
 */
exports.setpass = (data, callback) => {
    //console.log("services ",data.body);
    try {
        usermodels.updatepassword(data, (err, result) => {

            if (err) {

                console.log("service error");
                callback(err);

            }
            else {

                callback(null, result);
            }

        })
    }
    catch (err) {
        console.log("error in services:",err);
       
    }
}


exports.setProfilePic = (paramID, image, res) => {
    try {
        usermodels.setProfilePic(paramID, image, (err, data) => {
            if (err) {
                console.log("err in service..");
                res(err);
            }
            else {
                console.log("service is working fine");
                res(null, data);
            }
        })
    }
    catch (err) {
        console.log("error in services:",err);
    }
}