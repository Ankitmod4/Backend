const Business = require("../Models/Business_Model");

/* =========================
   GET BUSINESS BY ID
   ========================= */
exports.getBusinessById = async (req, res) => {
  try {
    const { id } = req.params;

    const business = await Business.findByPk(id, {
      attributes: ["id", "BusinessName", "Email", "PhoneNumber", "Password"],
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
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/* =========================
   UPDATE BUSINESS BY ID
   (PASSWORD INCLUDED)
   ========================= */
exports.updateBusinessById = async (req, res) => {
  try {
    const { id } = req.params;
    const { BusinessName, Email, PhoneNumber, Password } = req.body;

    const business = await Business.findByPk(id);

    if (!business) {
      return res.status(404).json({
        success: false,
        message: "Business not found",
      });
    }
    if(Email){
      const existingBusiness = await Business.findOne({ where: { Email } });
      if (existingBusiness && existingBusiness.id !== business.id) {
        return res.status(400).json({
          success: false,
          message: "Email already in use by another business",
        });
      }
    }

    // ✅ update fields only if provided
    if (BusinessName !== undefined) business.BusinessName = BusinessName;
    if (Email !== undefined) business.Email = Email;
    if (PhoneNumber !== undefined) business.PhoneNumber = PhoneNumber;
    if (Password && Password.trim() !== "") {
      business.Password = Password; // later bcrypt laga denge
    }

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
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
