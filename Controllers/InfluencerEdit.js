const Influencer = require("../Models/Influencer_Model");
const cloudinary = require("../config/cloudinary");

exports.getInfluencerId = async (req, res) => {
  try {
    const influencer = await Influencer.findByPk(req.params.id);

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
      error: error.message,
    });
  }
};


exports.updateInfluencer = async (req, res) => {
  try {
    const { Name, Email, Password, Category, Location, Followers, Price, AccountLinks, PhoneNo } = req.body;

    const influencer = await Influencer.findByPk(req.params.id);
    if (!influencer) {
      return res.status(404).json({ success: false, message: "Influencer not found" });
    }

    /* -------- LOCAL IMAGE HANDLING -------- */
    let imageUrl;
    if (req.file) {
      // Hum sirf Relative Path store karenge DB mein
      // Example: /uploads/influencers/123456.jpg
      imageUrl = `/uploads/influencers/${req.file.filename}`;
    }
   console.log("Received update request for Influencer ID:", req.file);
    /* -------- PARSE ACCOUNT LINKS -------- */
    let parsedLinks = AccountLinks;
    if (typeof AccountLinks === "string") {
      try {
        parsedLinks = JSON.parse(AccountLinks);
      } catch (e) {
        return res.status(400).json({ success: false, message: "Invalid AccountLinks JSON" });
      }
    }

    /* -------- UPDATE DATA -------- */
    const updateData = {
      ...(Name && { Name }),
      ...(Email && { Email }),
      ...(Password && { Password }),
      ...(Category && { Category }),
      ...(Location && { Location }),
      ...(Followers && { Followers }),
      ...(Price && { Price }),
      ...(PhoneNo && { PhoneNo }), // PhoneNo fix
      ...(parsedLinks && { AccountLinks: parsedLinks }),
      ...(imageUrl && { ProfilePicture: imageUrl }), // DB mein local path jayega
    };

    await influencer.update(updateData);

    res.status(200).json({
      success: true,
      message: "Influencer updated on Hostinger server!",
      data: influencer,
    });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};