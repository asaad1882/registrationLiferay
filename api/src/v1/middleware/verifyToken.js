exports.verifyToken=(req, res, next)=> {
  const token = process.env.token || "t0k3n";
  console.log("token:"+token)
  const API_KEY="x-api-key";
  
  if (req.headers[API_KEY] ) {
        let authorization = req.headers[API_KEY];
        if (authorization !== token) {
          return res.status(403).send({resultCode: "E",resultMessage:"Fail",
            errorMessage: ["UnAuthorized"] });  
        }else{
          return next();
        } 
   
} else {
    return res.status(401).send({resultCode: "E",resultMessage:"Fail",
      errorMessage: ["Forbidden"] });
}
}; 