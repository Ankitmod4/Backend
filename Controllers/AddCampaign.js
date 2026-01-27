const Campaign = require("../Models/Campain_Model");

exports.addCampaign = async (req, res) => {
  try {
    const {
      campaignName,
      influencerType,
      platformType,
      startDate,
      endDate,
      budget,
      location,
      email,      // ✅ EMAIL
      details,
    } = req.body;

    if (
      !campaignName ||
      !influencerType ||
      !platformType ||
      !startDate ||
      !endDate ||
      !budget ||
      !location ||
      !email ||        // ✅ VALIDATION
      !details
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const campaign = await Campaign.create({
      campaignName,
      influencerType,
      platformType,
      startDate,
      endDate,
      budget,
      location,
      email,       // ✅ SAVE EMAIL
      details,
    });

    res.status(201).json({
      success: true,
      message: "Campaign added successfully",
      data: campaign,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
