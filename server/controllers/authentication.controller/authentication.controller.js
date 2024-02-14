const User = require("../../models/user.schema");

exports.createOrUpdateUser = async (req, res) => {
	//extract email, and picture link, then from email create the default name for user
	const email = req.user.providerData[0].email;
	const picture = req.user.providerData[0].photoURL;
	const name = email.split("@")[0];

	try {
		//if there is already user in db, update new with req.user from checkToken middleware
		const user = await User.findOneAndUpdate({ name, picture }, { new: true });
		if (user) {
			console.log("USER UPDATED", user);
			res.status(200).json(user);
		} else {
			//if no user found, create new user with schema
			const newUser = await new User({
				name: name,
				picture,
			}).save();
			console.log("USER CREATED", newUser);
			res.status(200).json(newUser);
		}
	} catch (error) {
		console.log(error);
	}
};

exports.adminController = async (req, res) => {
	try {
		res.status(200).json(true);
	} catch (err) {
		console.log(err);
	}
};
