import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
