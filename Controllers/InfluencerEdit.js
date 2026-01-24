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
    console.error("Get Influencer Error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};



exports.updateInfluencer = async (req, res) => {
  try {
    const { Name, Category, Location, Followers, Price, AccountLinks } = req.body;

    const influencer = await Influencer.findByPk(req.params.id);
    if (!influencer) {
      return res.status(404).json({ message: "Influencer not found" });
    }

    const followersInt = parseInt(Followers, 10);
    const priceInt = parseInt(Price, 10);

    if (isNaN(followersInt) || isNaN(priceInt)) {
      return res.status(400).json({
        success: false,
        message: "Followers and Price must be numbers",
      });
    }

    let parsedLinks = {};
    if (AccountLinks) {
      try {
        parsedLinks = JSON.parse(AccountLinks);
      } catch {
        return res.status(400).json({
          success: false,
          message: "Invalid AccountLinks JSON",
        });
      }
    }

    let imageUrl;
    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "influencers" },
          (err, result) => (err ? reject(err) : resolve(result))
        );
        stream.end(req.file.buffer);
      });

      imageUrl = uploadResult.secure_url;
    }

    const updateData = {
      Name,
      Category,
      Location,
      Followers: followersInt,
      Price: priceInt,
      AccountLinks: parsedLinks,
    };

    if (imageUrl) updateData.ProfilePicture = imageUrl;

    await influencer.update(updateData);

    res.json({
      success: true,
      message: "Influencer updated successfully",
      data: influencer,
    });
  } catch (error) {
    console.error("Influencer Update Error:", error);
    res.status(500).json({ error: error.message });
  }
};
