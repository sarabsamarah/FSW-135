const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const commentSchema = new Schema({
  comment: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
    lowercase: true,
  },
  issueID: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("comment", commentSchema);