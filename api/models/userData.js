const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userDataSchema = new Schema({
  id: Number,
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  heading: String,
  subHeading: String,
  description: String,
  links: [
    {
      id: Number,
      linkText: String,
      linkURL: String,
    },
  ],
  socialLinks: [
    {
      id: Number,
      socialLinkIcon: String,
      socialLinkURL: String,
    },
  ],
  profileImage: String,
});

const UserData = mongoose.model("UserData", userDataSchema);

module.exports = UserData;
