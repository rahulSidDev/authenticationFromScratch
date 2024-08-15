import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

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

userSchema.statics.findAndValidate = async function (username, password) {
	const foundUser = await this.findOne({username}); // {username: username} can be replaced by just {username}
	if (!foundUser) {
		return false;
	}
	const isValid = await bcrypt.compare(password, foundUser.hashedPassword);
	return isValid ? foundUser : false;
}

userSchema.pre('save', async function(next) {
	if (!this.isModified('password')) return next();
	this.hashedPassword = await bcrypt.hash(this.hashedPassword, 12);
	next();
});

export default mongoose.model("User", userSchema);