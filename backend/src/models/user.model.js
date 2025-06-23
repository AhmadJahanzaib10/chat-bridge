import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePic: {
      type: String,
      default: "",
    },
    languageName: {
      type: String,
      default: "",
      require: true,
    },
    languageISOCode: {
      type: String,
      default: "",
      require: true,
    },
    flag: {
      type: String,
      default: "",
      require: true,
    },

  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
