const Business = require('../Models/Business_Model');

exports.createBusiness = async (req, res) => {
  try {
    const { PhoneNumber, Email, BusinessName, Password } = req.body;
    console.log('Received data for business registration:',req.body);

    console.log(PhoneNumber, Email, BusinessName, Password);

    if (!PhoneNumber || !Email || !BusinessName || !Password) {
      return res.status(400).json({
        success: false, 
        message: "All fields are required"
      });
    }

    
    const existingBusiness = await Business.findOne({
      where: { Email }
    });

    if (existingBusiness) {
      return res.status(400).json({
        success: false,
        message: "Email already exists, please login"
      });
    }

  
    const business = await Business.create({
      PhoneNumber,
      Email,
      BusinessName,
      Password
    });

    return res.status(201).json({
      success: true,
      message: "Business registered successfully",
      data: business
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
