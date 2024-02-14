const User = require("../../models/user.schema");

exports.createOrUpdateUser = async (req, res) => {
	const { name, email, picture } = req.user;
	try {
		//if there is already user in db, update new with req.user from checkToken middleware
		const user = await User.findOneAndUpdate(
			{ email },
			{ name, picture },
			{ new: true }
		);
		if (user) {
			console.log("USER UPDATED", user);
			res.status(200).json(user);
		} else {
			//if no user found, create new user with schema
			const newUser = await new User({
				email,
				name: email.split("@")[0],
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
