const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const commentSchema = new Schema({
  comment: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  issue: {
    type: Schema.Types.ObjectId,
    ref: "Issue",
    required: true
},
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  issueID: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("comment", commentSchema);