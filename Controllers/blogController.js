const Blog = require("../Models/Blogs_Model");
const cloudinary = require("../config/cloudinary");

/* ================= ADD BLOG ================= */
exports.addBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
      });
    }

    let imageUrl = null;

    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "blogs" },
          (err, result) => (err ? reject(err) : resolve(result))
        );
        stream.end(req.file.buffer);
      });
      // console.log("Cloudinary Upload Result:", uploadResult.url);

      imageUrl = uploadResult.url;
    }

    const blog = await Blog.create({
      title,
      content,
      image: imageUrl,
    });

    res.status(201).json({
      success: true,
      message: "Blog added successfully",
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/* ================= GET ALL BLOGS ================= */
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/* ================= DELETE BLOG ================= */
exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findByPk(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    await blog.destroy();

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};




