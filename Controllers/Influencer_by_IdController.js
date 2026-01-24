const Influencer = require('../Models/Influencer_Model');

exports.getInfluencerById = async (req, res) => {
  try {
    const { id } = req.params;

    const influencer = await Influencer.findByPk(id);

    if (!influencer) {
      return res.status(404).json({
        success: false,
        message: "Influencer not found",
      });
    }

    res.status(200).json({
      success: true,
      data: influencer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};