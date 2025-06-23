import UserChatPreference from "../models/userChatPreference.model.js";

export const updatePreferredLanguage = async (req, res) => {
  try {
    // ✅ Check if user is authenticated
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Unauthorized. User not found." });
    }

    const userId = req.user._id;
    const { receiverId, language, flag, isoCode } = req.body;

    // ✅ Validate inputs
    if (!receiverId || !language || !flag || !isoCode) {
      return res.status(400).json({ error: "receiverId, language, flag, and isoCode are required." });
    }

    const preferredLanguage = { language, flag, isoCode };

    // ✅ Check for existing chat preference
    let updatedPref = await UserChatPreference.findOne({ senderId: userId, receiverId:receiverId });
    

    if (!updatedPref) {
      // ✅ Create if not exists
      updatedPref = await UserChatPreference.create({
        senderId: userId,
        receiverId:receiverId,
        preferredLanguage:preferredLanguage,
      });
    } else {
      // ✅ Update if exists
      updatedPref = await UserChatPreference.findOneAndUpdate(
        { senderId: userId, receiverId },
        { $set: { preferredLanguage } },
        { new: true }
      );
    }

    res.status(200).json({
      message: "Preferred language updated successfully.",
      data: updatedPref.preferredLanguage,
    });

  } catch (error) {
    console.error("Error in updatePreferredLanguage:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
