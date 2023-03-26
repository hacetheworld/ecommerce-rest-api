const CorsPermission = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Header", "*");
    next();
  };

module.exports = CorsPermission;