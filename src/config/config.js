require("dotenv").config();
module.exports = {
  LOCAL: process.env.LOCAL || false,
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || "",
  SECRETORPRIVATEKEY: process.env.SECRETORPRIVATEKEY || "",
};