const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Config the cloudinary instance so it associates with our cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// New Cloudinary instance
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Leaflist",
    allowed_formats: ["png", "jpeg", "jpg"],
    // format: async (req, file) => ["png", "jpeg", "jpg"], // supports promises as well
    // public_id: (req, file) => "computed-filename-using-request",
  },
});

module.exports = {
  cloudinary,
  storage,
};
