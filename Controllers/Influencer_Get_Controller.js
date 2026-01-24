const Influencer = require('../Models/Influencer_Model');

exports.getAllInfluencers = async (req, res) => {
  try {
    const influencers = await Influencer.findAll();
    return res.status(200).json({
        success: true,
        message: "Influencers retrieved successfully",
        data: influencers
    });
    } catch (error) {
    return res.status(500).json({
        success: false,
        message: error.message
    });
    }
};