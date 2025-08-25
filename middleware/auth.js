const jwt = require("jsonwebtoken");

exports.authenticate = (req, res, next) => {
  // Check for token in Authorization header or cookies
  let token = req.headers.authorization?.split(" ")[1];
  if (!token && req.cookies) {
    token = req.cookies.token;
  }
  if (!token) return res.status(401).json({ error: "No token provided" });
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "fallback-secret"
    );
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Forbidden: insufficient role" });
    }
    next();
  };
};
