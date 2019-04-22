
var noteservices = require('../services/Noteservices');

const redis = require('redis');

const responseTime = require('response-time')
const express = require('express');
const app = express();

/**
 * @description:login is used to check the data is present in database or not..
 * @param {request from front end} req 
 * @param {response from backend} res 
 */

const client = redis.createClient();

// Print redis errors to the console
client.on('error', (err) => {
    console.log("Error " + err);
});

app.use(responseTime());



exports.createnote = (req, res) => {
    console.log("req in controleer", req.body);

    req.checkBody('title', 'Title should not be empty').not().isEmpty();
    req.checkBody('description', 'Description should notr be empty').not().isEmpty();
    // req.checkBody('color', 'color is in Hex-decimal formate').isEmail();
    // req.checkBody('password', 'password is not valid').isLength({ min: 4 });
    var errors = req.validationErrors();
    var response = {};
    if (errors) {
        response.success = false;
        response.error = errors;
        return res.status(422).send(response);
    } else {
        var responce = {}
        /**
         * @description:pass the request data to sevices....
         */
        noteservices.notecreate(req, (err, result) => {
            if (err) {
                responce.sucess = false;
                responce.result = err;
                res.status(500).send(responce);
            }
            else {
                responce.sucess = true;
                responce.result = result;
                res.status(200).send(responce);
            }
        })
    }
}
exports.getnote = (req, res) => {

    var responce = {}
    /**
     * @description:pass the request data to sevices....
     */
   var userID= req.decoded.payload.user_id;

    return client.get(userID, (err, result) => {
        // If that key exist in Redis store
    //    console.log("result==>", result);
        console.log("redis cacheee entered first");
        if (result) {
           //console.log("json", JSON.parse(result));
             JSON.parse(result);
            console.log('redis cache data ==>' + result);
           const resultJSON = JSON.parse(result);
           responce.result =  resultJSON ;
            return res.status(200).send(responce);
        }
        else{
            noteservices.noteget(req, (err, result) => {
                if (err) {
                    responce.sucess = false;
                    responce.result = err;
                    res.status(500).send(responce);
                }
                else {
                    responce.sucess = true;
                    responce.result = result;
                //    client.setex(userID, 3600, JSON.stringify(result));
                    res.status(200).send(responce);
                }
            })
        }
    })
}



exports.updatecolor = (req, res) => {
    console.log("color  req in color api=> ", req.body);

    req.checkBody('noteID', 'noteID should notr be empty').not().isEmpty();
    req.checkBody('color', 'color should notr be empty').not().isEmpty();
    var responce = {}
    /**
     * @description:pass the request data to sevices....
     */
    noteID = req.body.noteID;
    color = req.body.color;
    noteservices.updatecolor(noteID, color, (err, result) => {
        if (err) {
            responce.sucess = false;
            responce.result = err;
            res.status(500).send(responce);
        }
        else {
            responce.sucess = true;
            responce.result = result;
            res.status(200).send(responce);
        }
    })


}
exports.deleteNote = (req, res) => {
    req.checkBody('noteID', 'noteID should notr be empty').not().isEmpty();

    var responce = {}
    /**
     * @description:pass the request data to sevices....
     */

    noteservices.deleteNote(req, (err, result) => {
        if (err) {
            responce.sucess = false;
            responce.result = err;
            res.status(500).send(responce);
        }
        else {
            responce.sucess = true;
            responce.result = result;
            res.status(200).send(responce);
        }
    })



}

exports.isArchived = (req, res) => {
    // console.log("color  req in color api=> ", req.body);

    req.checkBody('noteID', 'noteID should notr be empty').not().isEmpty();
    //        req.checkBody('archive', 'color should notr be empty')
    var responce = {}
    /**
     * @description:pass the request data to sevices....
     */
    noteID = req.body.noteID;
    value = req.body.archive;
    noteservices.isArchived(noteID, value, (err, result) => {
        if (err) {
            responce.sucess = false;
            responce.result = err;
            res.status(500).send(responce);
        }
        else {
            responce.sucess = true;
            responce.result = result;
            res.status(200).send(responce);
        }
    })
}

exports.setReminder = (req, res) => {
    //  console.log("  req in reminder api=> ", req.body);

    req.checkBody('noteID', 'noteID should notr be empty').not().isEmpty();
    //        req.checkBody('archive', 'color should notr be empty')
    var responce = {}
    /**
     * @description:pass the request data to sevices....
     */
    noteID = req.body.noteID;
    value = req.body.reminder;
    noteservices.setReminder(noteID, value, (err, result) => {
        if (err) {
            responce.sucess = false;
            responce.result = err;
            res.status(500).send(responce);
        }
        else {
            responce.sucess = true;
            responce.result = result;
            res.status(200).send(responce);
        }
    })
}

exports.editTitle = (req, res) => {
    console.log("  req in reminder api=> ", req.body);

    req.checkBody('noteID', 'noteID should notr be empty').not().isEmpty();
    //        req.checkBody('archive', 'color should notr be empty')
    var responce = {}
    /**
     * @description:pass the request data to sevices....
     */
    noteID = req.body.noteID;
    value = req.body.Title;
    noteservices.editTitle(noteID, value, (err, result) => {
        //  console.log("tiitle result in controller==>",result);

        if (err) {
            responce.sucess = false;
            responce.result = err;
            res.status(500).send(responce);
        }
        else {
            responce.sucesssssssss = true;
            responce.result = result;
            res.status(200).send(responce);
            console.log("responce object-------------------------------------------->", responce);
        }
    })
}

exports.editDescription = (req, res) => {
    // console.log("  req in reminder api=> ", req.body);

    req.checkBody('noteID', 'noteID should notr be empty').not().isEmpty();
    //        req.checkBody('archive', 'color should notr be empty')
    var responce = {}
    /**
     * @description:pass the request data to sevices....
     */
    noteID = req.body.noteID;
    value = req.body.Description;
    noteservices.editDescription(noteID, value, (err, result) => {
        if (err) {
            responce.sucess = false;
            responce.result = err;
            res.status(500).send(responce);
        }
        else {
            responce.sucess = true;
            responce.result = result;
            res.status(200).send(responce);
        }
    })
}




exports.isTrash = (req, res) => {
    //  console.log("  req in reminder api=> ", req.body);

    req.checkBody('noteID', 'noteID should notr be empty').not().isEmpty();

    //        req.checkBody('archive', 'color should notr be empty')
    var responce = {}
    /**
     * @description:pass the request data to sevices....
     */
    noteID = req.body.noteID;

    noteservices.isTrash(noteID, (err, result) => {
        if (err) {
            responce.sucess = false;
            responce.result = err;
            res.status(500).send(responce);
        }
        else {
            responce.sucess = true;
            responce.result = result;

            res.status(200).send(responce);


        }
    })
}

exports.updatePin = (req, res) => {
    //  console.log("update  req in color api=> ", req.body);

    req.checkBody('noteID', 'noteID should notr be empty').not().isEmpty();
    //        req.checkBody('archive', 'color should notr be empty')
    var responce = {}
    /**
     * @description:pass the request data to sevices....
     */
    noteID = req.body.noteID;
    value = req.body.pinned;
    noteservices.updatePin(noteID, value, (err, result) => {
        if (err) {
            responce.sucess = false;
            responce.result = err;
            res.status(500).send(responce);
        }
        else {
            responce.sucess = true;
            responce.result = result;
            res.status(200).send(responce);
        }
    })
}


exports.updateImage = (req, res) => {
    //  console.log("update  req in color api=> ", req.body);

    req.checkBody('noteID', 'noteID should notr be empty').not().isEmpty();

    var responce = {}
    /**
     * @description:pass the request data to sevices....
     */
    noteID = req.body.noteID;
    value = req.body.image;
    noteservices.updateImage(noteID, value, (err, result) => {
        if (err) {
            responce.sucess = false;
            responce.result = err;
            res.status(500).send(responce);
        }
        else {
            responce.sucess = true;
            responce.result = result;
            res.status(200).send(responce);
        }
    })
}

exports.GettingS3url = (req, res) => {



    try {
         console.log("req-------------------->",req.file);
        // console.log("req-------------------->",req.file.location)
        var responseResult = {};
      
        let image = (req.file.location)

      
        // if (err) {
        //     responseResult.success = false;
        //     responseResult.error = err;
        //     res.status(500).send(responseResult)
        // } else {
        responseResult.status = true;
        responseResult.data = image;
        res.status(200).send(responseResult);
        // }

    } catch (error) {
        res.send(error);
    }

}

exports.saveLabelToNote = (req, res) => {
    try {
        var res_result = {};
        req.checkBody('noteID', 'noteID should not be empty').not().isEmpty();
      
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.success = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            noteservices.saveLabelToNote(req.body, (err, result) => {
                if (err) {

                    res_result.status = false;
                    res_result.error = err;
                    res.status(500).send(res_result);
                } else {
                    res_result.status = true;
                    res_result.data = result;
                    res.status(200).send(res_result);
                }
            })
        }
    } catch (error) {

        res.send(error)
    }
}


exports.deleteLabelToNote = (req, res) => {
    try {
      
       
        var res_result = {};
        req.checkBody('noteID', 'noteID should not be empty').not().isEmpty();
      
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.success = false;
            response.error = errors;
            return res.status(422).send(response);
        } else { 
            noteID = req.body.noteID;
            noteservices.deleteLabelToNote(noteID , (err, result) => {
                if (err) {
                    res_result.status = false;
                    res_result.error = err;
                    res.status(500).send(res_result);
                } else {
                    res_result.status = true;
                    res_result.data = result;
                    res.status(200).send(res_result);
                }
            })
        }
    } catch (error) {

      res.send(error)
    }
}




exports.addLabel = (req, res) => {
    try {
         console.log("in Controller", req.body, req.decoded,);

        var res_result = {};
        req.checkBody('label', 'label should not be empty').not().isEmpty();
        //   req.checkBody('description', 'Description should notr be empty').not().isEmpty();
        // req.checkBody('color', 'color is in Hex-decimal formate').isEmail();
        // req.checkBody('password', 'password is not valid').isLength({ min: 4 });
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.success = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            const labelData = {
                userID: req.decoded.payload.user_id,
                label: req.body.label
            }
            noteservices.addLabel(labelData, (err, result) => {
                if (err) {
                    res_result.status = false;
                    res_result.error = err;
                    res.status(500).send(res_result);
                }
                else {

                    res_result.status = true;
                    res_result.data = result;
                    res.status(200).send(res_result);
                }
            })
        }
    }
    catch (error) {
        res.send(error)
    }
}

exports.getLabels = (req, res) => {
    try {
      //  console.log("in Controller", req.decoded, req.decoded);

        var res_result = {};

        const labelData = {
            userID: req.decoded.payload.user_id,
        }
        noteservices.getLabels(labelData, (err, result) => {
            if (err) {
                res_result.status = false;
                res_result.error = err;
                res.status(500).send(res_result);
            }
            else {

                res_result.status = true;
                res_result.data = result;
                res.status(200).send(res_result);
            }
        })

    }
    catch (error) {
        res.send(error)
    }
}

exports.deleteLabel = (req, res) => {
    try {
       // console.log("in Controller", req.body);
        var res_result = {};
        req.checkBody('labelID', 'label should not be empty').not().isEmpty();
        
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.success = false;
            response.error = errors;
            return res.status(422).send(response);

        } else {
            const labelData = {
                labelID: req.body.labelID,
            }
            noteservices.deleteLabel(labelData, (err, result) => {
                if (err) {
                    res_result.status = false;
                    res_result.error = err;
                    res.status(500).send(res_result);
                }
                else {

                    res_result.status = true;
                    res_result.data = result;
                    res.status(200).send(res_result);
                }
            })
        }
    }
    catch (error) {
        res.send(error)
    }
}

exports.updateLabel = (req, res) => {
    try {
       // console.log("in Controller", req.body);

        var res_result = {};
        
        req.checkBody('labelID', 'label should not be empty').not().isEmpty();
        req.checkBody('editlabel', 'editlabel should not be empty').not().isEmpty();
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.success = false;
            response.error = errors;
            return res.status(422).send(response);

        } else {
            const labelData = {
                editLabel: req.body.editlabel,
                labelID: req.body.labelID
            }
            noteservices.updateLabel(labelData, (err, result) => {
                if (err) {

                    res_result.status = false;
                    res_result.error = err;
                    res.status(500).send(res_result);
                }
                else {

                    res_result.status = true;
                    res_result.data = result;
                    res.status(200).send(res_result);
                }
            })
        }
    }
    catch (error) {
        res.send(error)
    }
}







