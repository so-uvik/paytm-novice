const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./config');


const authMiddleware = (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || authHeader.split("")[0] != "Bearer") {
    res.status(403).json({ message: "authorization Header format wrong or not present" })
  }
  const token = authHeader.split("")[1];

  try {
    const decoded = jwt.decode(token, JWT_SECRET);
    req.userId = decoded;
  }
  catch (e) {
    res.status(403).json({ message: "There has been an error verifying the token." });
  }
}

module.exports = {
  authMiddleware
}
