const express = require('express');
const app = express();
const connectDb = require('./src/v1/utils/connection');
const apicache = require("apicache");
const profile_routes = require('./src/v1/routes/profile.js');
const { swaggerDocs: V1SwaggerDocs } = require("./src/v1/swagger");
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');

const { verifyToken } = require('./src/v1/middleware/verifyToken.js');
const rateLimitMiddleware = require('./src/v1/middleware/rateLimiter.js');
const PORT = 8080;
app.use(cors());
// Body parser implement
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(methodOverride());
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
app.use(express.json());
const cache = apicache.middleware;
var unless = function(middleware, ...paths) {
  return function(req, res, next) {
    const pathCheck = paths.some(path =>  req.path.startsWith(path));
    pathCheck ? next() : middleware(req, res, next);
  };
};
app.use(rateLimitMiddleware);
app.use(unless(verifyToken,"/api/v1/docs","/favicon.ico"));
app.use('/api/v1',  profile_routes);

app.listen(PORT, function() {
  console.log(`Listening on ${PORT}`);
  V1SwaggerDocs(app, PORT);
  connectDb().then(() => {
    console.log('MongoDb connected');
  });
});
