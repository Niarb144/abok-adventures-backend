import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dbw17hrqd",
  api_key: "578986455996639",
  api_secret: "wWKRCSD_0FTxbadXCPEIwvtUE8s",
});

console.log("✅ Cloudinary configured" + ` (cloud: ${process.env.CLOUDINARY_CLOUD_NAME})` + ` (key: ${process.env.CLOUDINARY_API_KEY})` + ` (secret: ${process.env.CLOUDINARY_API_SECRET ? "***" : "NOT SET"})`);

export default cloudinary;
