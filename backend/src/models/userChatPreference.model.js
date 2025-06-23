import mongoose from "mongoose";

const preferredLanguageSchema = new mongoose.Schema({
  language: String,
  flag: String,
  isoCode: String
})

const userChatPreferenceSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    preferredLanguage: preferredLanguageSchema
  },
  { timestamps: true }
);

// Ensure no duplicate user-partner pairs
userChatPreferenceSchema.index({ senderId: 1, receiverId: 1 }, { unique: true });

const UserChatPreference = mongoose.model("UserChatPreference", userChatPreferenceSchema);

export default UserChatPreference;
