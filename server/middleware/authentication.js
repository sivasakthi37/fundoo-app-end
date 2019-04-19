
/**
 * @description:it is used to generate the token.....
 */
var jwt = require('jsonwebtoken');
/**
 * @description:it is used to check your token is valid or not...
 */
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
    console.log("check token enter sucessfully");
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
                //  console.log("request in request==>",req.decoded);
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