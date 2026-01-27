const Campaign = require("../Models/Campain_Model");
const { Op } = require("sequelize");

exports.getAllCampaigns = async (req, res) => {
  try {
    const today = new Date();

    const campaigns = await Campaign.findAll({
      where: {
        endDate: {
          [Op.gte]: today, // ✅ only active campaigns
        },
      },
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      message: "Active campaigns fetched successfully",
      data: campaigns,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
