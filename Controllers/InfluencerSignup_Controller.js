const Influencer = require('../Models/Influencer_Model');

exports.signupInfluencer = async (req, res) => {
  try {
    const {
      Name,
      Email,
      Password,
      Category,
      Location,
      Followers,
      Price,
      AccountLinks
    } = req.body;

    // Validation
    if (
      !Name ||
      !Email ||
      !Password ||
      !Category ||
      !Location ||
      !Followers ||
      !Price ||
      !AccountLinks
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // Email already exists
    const existing = await Influencer.findOne({ where: { Email } });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Email already registered go to login"
      });
    }

    const influencer = await Influencer.create({
      Name,
      Email,
      Password,
      Category,
      Location,
      Followers,
      Price,
      AccountLinks
    });

    return res.status(201).json({
      success: true,
      message: "Influencer signup successful",
      data: influencer
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
