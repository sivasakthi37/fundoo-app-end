
/**
 * @description:it is used to generate the token.....
 */
var jwt = require('jsonwebtoken');
/**
 * @description:it is used to check your token is valid or not...
 */

const responseTime = require('response-time')

const redis = require('redis');


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


exports.checkToken = (req,res,next) => {
  // console.log("request of authorization ",req.body);
    var tokens = req.headers['token']; 
   //console.log("check token enter sucessfully");
    if (tokens)
    {
        // verifies secret and checks exp
        jwt.verify(tokens, 'secretkey', (err, decoded) => 
        {
            if (err) 
            {
                
                return res.status(401).send({
                    success: false,
                    message: 'Token is not valid'
                });
            } 
            else 
            {
                /**
                 * @description:add the decoded to your req data....
                 */
                req.decoded = decoded;
                //console.log("request in request==>",req.decoded);
                console.log("your token is valid",);
                next();
            }
        });
    } 
    else 
    {
        // if there is no token return an error
        return res.send({
            success: false,
            message: 'No token provided.'
        });
    }
}

exports.checkTokenAuthentication= (req,res,next) => {
   //  console.log("request of authorization ",req);
      var tokens = req.headers['token']; 
    console.log("check token enter sucessfully hereeeeeeeeeeeeeeeeee");
      if (tokens)
      {
          // verifies secret and checks exp
          jwt.verify(tokens, 'secretkey-Authentication', (err, decoded) => 
          {
              if (err) 
              {
                  
                  return res.status(401).send({
                      success: false,
                      message: 'Token is not valid'
                  });
              } 
              else 
              {
                  /**
                   * @description:add the decoded to your req data....
                   */
                  req.decoded = decoded;

                  var userID= req.decoded.payload.user_id;
                //  console.log("request in request==>",req.decoded);
                  console.log("your token is valid");

                //   client.del(userID, (err, response) => {
                //     if (response == 1) {
                //         console.log("redis  Deleted Successfully!")
                //         next();
            
                //         res.status(200).send("Deleted Successfully!");
                //     } else {
                //         console.log("Cannot delete")
                //         res.status(500).send("Cannot delete");
                //         next();
                //     }
                // })
                next();     
              }
          });
      } 
      else 
      {
          // if there is no token return an error
          return res.send({
              success: false,
              message: 'No token provided.'
          });
      }
  }