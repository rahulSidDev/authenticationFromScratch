import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "username cannot be blank."]
	},
	hashedPassword: {
		type: String,
		required: [true, "password cannot be blank."]
	}
})

export default mongoose.model("User", userSchema);