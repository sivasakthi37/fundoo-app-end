const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
/**
 * @description:userschema is used to create a schema...
 */
const UserSchema = mongoose.Schema({
    firstname: {
        type: String, required: [true, "firstname require"]
    },
    lastname: {
        type: String, required: [true, "lastname require"]
    },
    email: {
        type: String, required: [true, "email require"]
    },
    password: {
        type: String, required: [true, "password require"]
    },
    profilepic: {
        type: String,
    }
},
    {
        timestamps: true
    });

function usermodel() { }
/**
 * @description:it is used to crete a collection in your database..
 */
const user = mongoose.model('user', UserSchema);
/**
 *@description:this function is used to create bycryt your password... 
 * @param {password} Password 
 */
function hash(Password) {
    let hash = bcrypt.hashSync(Password, 10);

    return hash;
}
/**
 * @description:register is used to register the user data in database...
 * @param {req data from the client} req 
 * @param {responce data from the database} res 
 */

usermodel.prototype.registration = (req, res) => {
    user.find({ "email": req.body.email }, (err, data) => {
        console.log("register data in user models");
        if (err) {
            console.log("err  in register models ");
            res(err);
        }
        else if (data.length > 0) {
            console.log("Email id already exist");
            res("user already present");
        }
        else {
            const userdata = new user({
                "firstname": req.body.firstname,
                "lastname": req.body.lastname,
                "email": req.body.email,
                "password": hash(req.body.password),
                "profilepic": ""
            })
            userdata.save((err, result) => {
                if (err) {
                    console.log("Model not found");
                    res(err);
                } else {
                    console.log("Register Sucessfully");
                    res(null, result);
                }
            })
        }
    })
}
/**
 * @description:login is used to check the data is present in database or not..
 * @param {request from front end} req 
 * @param {responce from backend} res 
 */
usermodel.prototype.login = (req, callback) => {
    user.findOne({ "email": req.body.email }, (err, data) => {
        if (err) {
            callback(err);
        } else if (data != null) {
            bcrypt.compare(req.body.password, data.password)
                .then(function (res) {
                    if (res) {
                        console.log("login succesfully");
                        console.log("responce login", res);

                        callback(null, data);
                    } else {
                        console.log("Incorrect password");
                        callback("Incorrect password");
                    }
                });
        }
        else {
            console.log("Invalid user");
            callback("invalid user");
        }
    })
}
/**
 * @description:checkvalid use to find the data is present or not...
 */
usermodel.prototype.checkvalid = (res, callback) => {
    user.find({ "email": res.body.email }, (err, data) => {
        if (err) {
            console.log("error");

            callback(err);
        }
        else {
            callback(null, data);
        }
    })

}
/**
 * @description:updatepassword is used to update the password in database...
 */
usermodel.prototype.updatepassword = (res, callback) => {

    var password = hash(res.body.password);
    user.updateOne({ _id: res.decoded.payload.user_id }, { password: password }, (err, result) => {
        if (err) {
            callback(err);
        }
        else {
            callback(null, result);
        }
    });
}


usermodel.prototype.setProfilePic = (paramID, image, res) => {
    console.log("param id==>", paramID);
    console.log("param id==>", image);
    user.findOneAndUpdate(
        {
            _id: paramID
        },
        {
            $set: {
                "profilepic": image,
            }
        },
        (err, result) => {
            console.log("result in update pin", result);

            if (err) {
                res(err)
            } else {

                return res(null, image)
            }
        });
}









module.exports = new usermodel;