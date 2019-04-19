/*********************************************************************** 
* 
*  Purpose         : create fundoo application....
* 
*  @description    
* 
*  @file           : server.js
*  @overview       : create fundoo application.....
*  @author         : sivasakthi
*  @version        : 1.0
*  @since          : 19-02-2019
*
************************************************************************/

/**
 * @description:express module one of light weight framework
 */
const express = require('express');
/**
 * @description:calling routers file..
 */
const routes = require('./routes/routes');
/**
 * @description:store the express() in app variable..
 */
const app = express();
/**
 * @description:mongoose module is used to database manupulation...
 */
const mongoose = require('mongoose');
/**
 * @description:require the config file to pass url
 */
const config = require('./config/mongodb.connection')
/**
 * @description:require the body-parser module it is use to parse your body object.......
 */
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var expressValidator = require('express-validator')
app.use(expressValidator());


app.get('/', (req, res) => {


    res.json("Im in localhost 8000")
})
/**
 * @description:pass your app control to router file
 */
app.use('/', routes);

/**
 * @description:you have to set the port to lisen the server...
 */
app.listen(8000, () => {
    console.log("see your local host 8000");
})

/**
 * @description:this is use to connect the database using moongoose... 
 */
mongoose.connect(config.url, { useNewUrlParser: true })
    .then((res) => {
        console.log("mongoose data base connected sucessfully");
    }).catch(err => {
        console.log("mongo db connection error", err);
        process.exit();
    })
/**
 * @description:export the express app to testing perpose....
 */
module.exports = app;


