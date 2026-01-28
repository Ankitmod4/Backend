const express = require("express");
const router = express.Router();
const upload = require("../Middlewares/upload");

const { createBusiness } = require("../Controllers/BusinessSignup_Controller");
const { updateInfluencer,getInfluencerId } = require("../Controllers/InfluencerEdit");
const {
  getAllUsers,
  getAllInfluencersAdmin,
  deleteUser,
  deleteInfluencer,
} = require("../Controllers/Admin_ManageController");
const { loginBusiness } = require("../Controllers/BusinessLoginController");
const {
  signupInfluencer,
} = require("../Controllers/InfluencerSignup_Controller");
const {
  loginInfluencer,
} = require("../Controllers/InfluencerLogin_Controller");
const { AdminLogin } = require("../Controllers/Admin_login");
const {
  getAllInfluencers,
} = require("../Controllers/Influencer_Get_Controller");
const { addCampaign } = require("../Controllers/AddCampaign");
const {
  getInfluencerById,
} = require("../Controllers/Influencer_by_IdController");
const { getAllCampaigns } = require("../Controllers/GetAllCampaign");
const { updateBusinessById,getBusinessById } = require("../Controllers/UserEdit");
const {
  addBlog,
  getAllBlogs,
  deleteBlog,
} = require("../Controllers/blogController");

router.get("/influencers", getAllInfluencers);
router.get("/influencers/:id", getInfluencerById);
router.post("/admin/login", AdminLogin);
router.post("/influencer/signup", signupInfluencer);
router.post("/influencer/login", loginInfluencer);
router.post("/business/register", createBusiness);
router.post("/business/login", loginBusiness);
router.get("/influencer/:id", getInfluencerId);
router.get("/campaigns", getAllCampaigns);
router.put("/business/:id", updateBusinessById);
router.post("/addcampaign", addCampaign);
// LIST
router.get("/admin/users", getAllUsers);
router.get("/admin/influencers", getAllInfluencersAdmin);
router.get("/business/:id", getBusinessById);
router.post("/blogs",  upload.single("image"),
 addBlog);

router.get("/blogs", getAllBlogs);

router.delete("/blogs/:id", deleteBlog);

router.put(
  "/influencer/:id",
  upload.single("ProfilePicture"), // 👈 field name
  updateInfluencer
);
// DELETE
router.delete("/admin/user/:id", deleteUser);
router.delete("/admin/influencer/:id", deleteInfluencer);
module.exports = router;
