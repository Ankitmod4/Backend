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
    const {
      Name,
      Email,
      Password,
      Category,
      Location,
      Followers,
      Price,
      AccountLinks,
    } = req.body;

    const influencer = await Influencer.findByPk(req.params.id);
    if (!influencer) {
      return res.status(404).json({
        success: false,
        message: "Influencer not found",
      });
    }
    if(Email){
      const existingInfluencer = await Influencer.findOne({ where: { Email } });
      if (existingInfluencer && existingInfluencer.id !== influencer.id) {
        return res.status(400).json({
          success: false,
          message: "Email already in use by another influencer",
        });
      }
    }

    /* -------- ACCOUNT LINKS -------- */
    let parsedLinks;
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

    /* -------- IMAGE UPLOAD -------- */
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

    /* -------- UPDATE DATA -------- */
    const updateData = {
      ...(Name && { Name }),
      ...(Email && { Email }),
      ...(Password && { Password }), // ✅ SIMPLE PASSWORD UPDATE
      ...(Category && { Category }),
      ...(Location && { Location }),
      ...(Followers && { Followers }),
      ...(Price && { Price }),
      ...(parsedLinks && { AccountLinks: parsedLinks }),
      ...(imageUrl && { ProfilePicture: imageUrl }),
    };

    await influencer.update(updateData);

    res.status(200).json({
      success: true,
      message: "Influencer updated successfully",
      data: influencer,
    });
  } catch (error) {
    console.error("Influencer Update Error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
