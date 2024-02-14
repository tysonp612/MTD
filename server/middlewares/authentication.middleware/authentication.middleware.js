const admin = require("../../firebase/index");
const User = require("./../../models/user.schema");
exports.authTokenCheck = async (req, res, next) => {
	try {
		// const firebaseUser = await getAuth().verifyIdToken(req.headers);
		//verify the token sent from header to extract user data
		//then use the user uid to get user detail, including email for login with google and log in with email and password, then pass that data forward to controller
		const verifyToken = await admin.auth().verifyIdToken(req.headers.authtoken);
		const userDetails = await admin.auth().getUser(verifyToken.uid);
		req.user = userDetails;

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
