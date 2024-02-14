const admin = require("../../firebase/index");
const User = require("./../../models/user.schema");
exports.authTokenCheck = async (req, res, next) => {
  try {
    // const firebaseUser = await getAuth().verifyIdToken(req.headers);
    const verifyToken = await admin.auth().verifyIdToken(req.headers.authtoken);
    req.user = verifyToken;
    next();
  } catch (error) {
    res.status(401).json({ err: "Invalid or expired token" });
  }
};

exports.adminCheck = async (req, res, next) => {
  const user = await User.findOne({ email: req.user.email });
  if (user.role === "admin") {
    next();
  } else res.status(403).json("Admin resources, access denined");
};
