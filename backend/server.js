import app from "./app.js";
 import cloudinary from "cloudinary";

 cloudinary.v2.config({
  cloud_name:"dkzqlh38m",
  api_key: "372922531289338",
  api_secret:"xaqUqsbGVHbtxAKxLRU6IXBLEPw" ,
});

app.listen(4000, () => {
  console.log(`Server running at port ${4000}`);
});
