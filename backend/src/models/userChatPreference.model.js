import mongoose from "mongoose";

const userChatPreferenceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    partnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    preferredLanguage: {
      type: String,
    },
  },
  { timestamps: true }
);

// Ensure no duplicate user-partner pairs
userChatPreferenceSchema.index({ userId: 1, partnerId: 1 }, { unique: true });

const UserChatPreference = mongoose.model("UserChatPreference", userChatPreferenceSchema);

export default UserChatPreference;
