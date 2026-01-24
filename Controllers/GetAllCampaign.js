const Campaign = require("../Models/Campain_Model");


exports.getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      message: "Campaigns fetched successfully",
      data: campaigns,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
