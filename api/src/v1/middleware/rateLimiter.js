const setRateLimit = require("express-rate-limit");

// Rate limit middleware
const rateLimitMiddleware = setRateLimit({
  windowMs: 60 * 1000,
  max: 5,
  handler: function (req, res, next) {
    res.status(429).json({
      resultCode: "F",
      resultMessahe: "Fail",
      errorMessage:"You have exceeded your 5 requests per minute limit.",
    });
  },
  headers: true,
});
module.exports = rateLimitMiddleware;