const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userDataSchema = new Schema({
  id: Number,
  username: String,
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
