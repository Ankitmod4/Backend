const Business = require("../Models/Business_Model");

/* =========================
   GET BUSINESS BY ID
   ========================= */
exports.getBusinessById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Fetching business with ID:", id);

    const business = await Business.findByPk(id, {
      attributes: ["id", "BusinessName", "Email", "PhoneNumber"],
    });

    if (!business) {
      return res.status(404).json({
        success: false,
        message: "Business not found",
      });
    }

    res.status(200).json({
      success: true,
      data: business,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/* =========================
   UPDATE BUSINESS BY ID
   ========================= */
exports.updateBusinessById = async (req, res) => {
  try {
    const { id } = req.params;
    const { BusinessName, Email, PhoneNumber } = req.body;

    console.log("Updating business with ID:", id);

    const business = await Business.findByPk(id);

    if (!business) {
      return res.status(404).json({
        success: false,
        message: "Business not found",
      });
    }

    // update only allowed fields
    business.BusinessName = BusinessName ?? business.BusinessName;
    business.Email = Email ?? business.Email;
    business.PhoneNumber = PhoneNumber ?? business.PhoneNumber;

    await business.save();

    res.status(200).json({
      success: true,
      message: "Business updated successfully",
      data: {
        id: business.id,
        BusinessName: business.BusinessName,
        Email: business.Email,
        PhoneNumber: business.PhoneNumber,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
