const Business = require('../Models/Business_Model');

exports.loginBusiness = async (req, res) => {
  try {
    
    const { Email, Password } = req.body;

    console.log(Email, Password);

    
    if (!Email || !Password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required"
      });
    }

   
    const business = await Business.findOne({
      where: { Email }
    });

    if (!business) {
      return res.status(404).json({
        success: false,
        message: "Business not found with this email go to signup"
      });
    }

    
    if (business.Password !== Password) {
      return res.status(401).json({
        success: false,
        message: "Invalid password"
      });
    }


    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        id: business.id,
        BusinessName: business.BusinessName,
        Email: business.Email
      }
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
