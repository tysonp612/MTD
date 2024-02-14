const User = require("../../models/user.schema");

exports.createOrUpdateUser = async (req, res) => {
	// Extract email and picture link, then from email create the default name for the user
	const { email, photoURL: picture } = req.user.providerData[0];
	const name = email.split("@")[0];

	try {
		// Find user by email. If exists, update the picture, otherwise create a new user
		let user = await User.findOneAndUpdate(
			{ email },
			{ name, picture },
			{ new: true, upsert: true }
		);

		// If a user was found or created, log the action and prepare the response
		if (user) {
			console.log(`USER ${user ? "UPDATED" : "CREATED"}`);

			// Construct a response object with only the specified fields
			const userResponse = {
				name: user.name,
				email: user.email,
				role: user.role,
				_id: user._id,
			};

			// Send the formatted user response
			res.status(200).json(userResponse);
		}
	} catch (error) {
		console.error(error);
		res.status(500).send("Error in creating or updating the user");
	}
};

exports.adminController = async (req, res) => {
	try {
		res.status(200).json(true);
	} catch (err) {
		console.log(err);
	}
};
