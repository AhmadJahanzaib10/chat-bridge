import UserChatPreference from "../models/userChatPreference.model.js";

export const updatePreferredLanguage = async (req, res) => {
  try {
    const userId = req.user._id; // from auth middleware
    const { partnerId, preferredLanguage } = req.body;
    console.log(userId, partnerId, preferredLanguage)

    if (!partnerId || !preferredLanguage) {
      return res.status(400).json({ error: "partnerId and preferredLanguage are required." });
    }

    const updatedPref = await UserChatPreference.findOneAndUpdate(
      { userId, partnerId },
      { preferredLanguage },
      { new: true }
    );

    if (!updatedPref) {
      return res.status(404).json({ error: "Chat preference not found." });
    }

    res.status(200).json({
      message: "Preferred language updated successfully.",
      data: updatedPref,
    });
  } catch (error) {
    console.error("Error in updatePreferredLanguage:", error.message);
    res.status(500).json({ error: "Internal server error." });
  }
};
