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


// Get specific Campaigns by EmailId
exports.getCampaignsByEmail = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("Email received in controller:", email); // Debug log
    const campaigns = await Campaign.findAll({
      where: { email,
          // endDate: {
          //   [Op.gte]: new Date(), // ✅ only active campaigns
          // },  

       },
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      message: "Campaigns fetched successfully",
      data: campaigns,
    });
  }
    catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
};


// Delete a campaign

exports.DeleteACampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Campaign.destroy({ where: { id } });
    if (deleted) { 
      res.status(200).json({
        success: true,
        message: "Campaign deleted successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Campaign not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


