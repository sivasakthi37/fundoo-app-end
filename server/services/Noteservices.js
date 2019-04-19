var notemodels = require('../app/NoteModel');
exports.notecreate = (req, res) => {
    try {
        notemodels.CreateNote(req, (err, data) => {
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


exports.updatecolor = (paramID, paramData, res) => {
    try {
        notemodels.updatecolor(paramID, paramData, (err, data) => {
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
