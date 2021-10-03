const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let emote = new Schema(
  {
    brawler: String,
    pin: String,
    url: String,
    rarity: String,
    
  },
);

module.exports = mongoose.model("emotes", emote);

