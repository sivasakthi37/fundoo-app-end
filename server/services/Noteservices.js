var notemodels = require('../app/NoteModel');

// const EventEmitter = require('events');

// class MyEmitter extends EventEmitter {}
// const myEmitter = new MyEmitter();


exports.notecreate = (req, res) => {
    try {
        notemodels.CreateNote(req, (err, data) => {
            if (err) {
                console.log("err in service..");
                res(err);
            }
            else {
                console.log("service is working fine");
                // myEmitter.on('event', (a, b) => {
                //     console.log(a, b, this);
                //     // Prints: a b {}
                //   });

                res(null, data);
            }
        })
    }
    catch (err) {
        console.log("error in services:", err);
    }
}

exports.noteget = (req, res) => {
    try {
        notemodels.getnote(req, (err, data) => {
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
        console.log("error in services:", err);
    }
}
exports.updatecolor = (paramID, paramData) => {
    return new Promise((resolve, reject) => { 
    notemodels.updatecolor(paramID, paramData)
        .then((result) => {
            console.log("service is working fine promisses",result);
            resolve(result);
        }).catch((err) => {
            console.log("err in service..");
            reject(err);
        })
    });
}

// exports.updatecolor = (paramID, paramData, res) => {
//     try {
//         notemodels.updatecolor(paramID, paramData, (err, data) => {
//             if (err) {
//                 console.log("err in service..");
//                 res(err);
//             }
//             else {
//                 console.log("service is working fine");
//                 res(null, data);
//             }
//         })
//     }
//     catch (err) {
//         console.log("error in services:", err);
//     }
// }
exports.deleteNote = (req, res) => {
    try {
        notemodels.deleteNote(req, (err, data) => {
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
        console.log("error in services:", err);

    }
}


exports.isArchived = (paramID, paramData, res) => {
    try {
        notemodels.isArchived(paramID, paramData, (err, data) => {
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
        console.log("error in services:", err);
    }
}


exports.setReminder = (paramID, paramData, res) => {
    try {
        notemodels.setReminder(paramID, paramData, (err, data) => {
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
        console.log("error in services:", err);
    }
}

exports.editTitle = (paramID, paramData, res) => {
    try {
        notemodels.editTitle(paramID, paramData, (err, data) => {
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
        console.log("error in services:", err);
    }
}

exports.editDescription = (paramID, paramData, res) => {
    try {
        notemodels.editDescription(paramID, paramData, (err, data) => {
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
        console.log("error in services:", err);
    }
}


exports.isTrash = (paramID, callback) => {
    console.log("in services", paramID);
    notemodels.getTrashStatus(paramID, (err, status) => {
        if (err) {
            callback(err);
        } else {
            if (status === true) {
                let data = {
                    status: false
                }
                notemodels.isTrashed(paramID, data, (err, result) => {
                    if (err) {
                        callback(err);
                    } else {
                        return callback(null, result)
                    }
                })
            } else if (status === false) {
                let data = {
                    status: true
                }
                notemodels.isTrashed(paramID, data, (err, result) => {
                    if (err) {
                        callback(err);
                    } else {
                        return callback(null, result)
                    }
                })
            }

        }
    })


}


exports.updatePin = (paramID, paramData, res) => {
    try {
        notemodels.updatePin(paramID, paramData, (err, data) => {
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
        console.log("error in services:", err);
    }
}


exports.updateImage = (paramID, paramData, res) => {
    try {
        notemodels.updateImage(paramID, paramData, (err, data) => {
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
        console.log("error in services:", err);
    }
}

exports.saveLabelToNote = (paramData, callback) => {
    console.log("in services", paramData);
    if (paramData.pull) {
        notemodels.deleteLabelToNote(paramData, (err, result) => {
            if (err) {
                callback(err);
            } else {
                return callback(null, result)
            }
        })
    }
    else {

        notemodels.saveLabelToNote(paramData, (err, result) => {
            if (err) {
                callback(err);
            } else {
                return callback(null, result)
            }
        })
    }
}

exports.deleteLabelToNote = (paramData, callback) => {
    console.log("in services", paramData);

    notemodels.deleteLabelToNote(paramData, (err, result) => {
        if (err) {
            callback(err);
        } else {
            return callback(null, result)
        }
    })
}

exports.addLabel = (labelData, callback) => {
    ///  console.log("in services",labelData);

    notemodels.addLabel(labelData, (err, result) => {
        if (err) {
            callback(err);
        } else {
            return callback(null, result)
        }
    })
}

exports.getLabels = (labelData, callback) => {
    //  console.log("in services",labelData);

    notemodels.getLabels(labelData, (err, result) => {
        if (err) {
            callback(err);
        } else {
            return callback(null, result)
        }
    })
}
exports.deleteLabel = (labelData, callback) => {
    // console.log("in services",labelData);

    notemodels.deleteLabel(labelData, (err, result) => {
        if (err) {
            callback(err);
        } else {
            return callback(null, result)
        }
    })
}

exports.updateLabel = (labelData, callback) => {
    //  console.log("in services",labelData);

    notemodels.updateLabel(labelData, (err, result) => {
        if (err) {
            callback(err);
        } else {
            return callback(null, result)
        }
    })
}

exports.updateqanda = async (qandaData, callback) => {
    //  console.log("in services",labelData);

    await notemodels.updateqanda(qandaData, (err, result) => {
        if (err) {
            callback(err);
        } else {
            return callback(null, result)
        }
    })
}

exports.getqandadetail = (qandaData, callback) => {
    //  console.log("in services",labelData);

    notemodels.getqandadetails(qandaData, (err, result) => {
        if (err) {
            callback(err);
        } else {
            return callback(null, result)
        }
    })
}
