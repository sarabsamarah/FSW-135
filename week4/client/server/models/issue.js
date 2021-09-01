const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const issueSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  upVote: {
    type: Number,
    required: false,
  },
  downVote: {
    type: Number,
    required: false,
  },
  userID: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});
module.exports = mongoose.model("issue", issueSchema);