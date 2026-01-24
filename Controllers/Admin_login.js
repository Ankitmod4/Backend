const express = require('express');
const Admin = require('../Models/Admin_Model');

exports.AdminLogin = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    // Validation
    if (!Email || !Password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required"
      });
    }

    
    if (
      Email === "ankit300mod@gmail.com" &&
      Password === "ankitmod123"
    ) {
      return res.status(200).json({
        success: true,
        message: "Admin login successful",
        data: {
          role: "admin",
          Email: Email
        }
      });
    }

    // ❌ Wrong credentials
    return res.status(401).json({
      success: false,
      message: "Invalid admin credentials"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
