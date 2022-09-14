const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: Schema.Types.ObjectId,
  // email: {
  //   type: String,
  //   // required: true,
  //   unique: true,
  // },
  // password: {
  //   type: String,
  //   required: true,
  // },
  heading: String,
  subHeading: String,
  description: String,
  links: [
    {
      id: Schema.Types.ObjectId,
      linkText: String,
      linkURL: String,
    },
  ],
  socialLinks: [
    {
      id: Schema.Types.ObjectId,
      socialLinkIconName: String,
      socialLinkURL: String,
    },
  ],
  profileImageSrc: {
    url: String,
    filename: String,
  },
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

module.exports = User;
