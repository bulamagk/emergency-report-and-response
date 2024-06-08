const jwt = require("jsonwebtoken");

const verfiryToken = async (req, res, next) => {
  let token = req.cookies.jwt;

  if (token) {
    try {
      // Decode token
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.userId = decoded.userId;

      next();
    } catch (error) {
      return res.json({ message: error.message });
    }
  } else {
    return res.status(401).json({ message: "You are not authorized" });
  }
};

module.exports = {
  verfiryToken,
};
