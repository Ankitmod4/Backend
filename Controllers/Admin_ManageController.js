const Business = require("../Models/Business_Model");
const Influencer = require("../Models/Influencer_Model");

// GET ALL USERS
exports.getAllUsers = async (req, res) => {
  try {
    const users = await Business.findAll();

    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL INFLUENCERS
exports.getAllInfluencersAdmin = async (req, res) => {
  try {
    const influencers = await Influencer.findAll();

    res.json({
      success: true,
      data: influencers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE USER
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await Business.destroy({ where: { id } });

    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE INFLUENCER
exports.deleteInfluencer = async (req, res) => {
  try {
    const { id } = req.params;

    await Influencer.destroy({ where: { id } });

    res.json({
      success: true,
      message: "Influencer deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
