const Influencer = require('../Models/Influencer_Model');

exports.loginInfluencer = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required"
      });
    }

    const influencer = await Influencer.findOne({
      where: { Email }
    });

    if (!influencer) {
      return res.status(404).json({
        success: false,
        message: "Influencer not found"
      });
    }

    if (influencer.Password !== Password) {
      return res.status(401).json({
        success: false,
        message: "Invalid password"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        id: influencer.id,
        Name: influencer.Name,
        Email: influencer.Email
      }
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
