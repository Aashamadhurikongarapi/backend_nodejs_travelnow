const Vendor=require('../models/Vendor');
const jwt=require('jsonwebtoken');
const dotEnv=require('dotenv');

dotEnv.config();
const secretKey = process.env.WhatIsYourName; // Ensure this is set correctly in .env

const verifyToken = async (req, res, next) => {
    console.log("Headers received:", req.headers);

    const token = req.headers.authorization?.split(" ")[1] || req.headers.token;
    console.log("Extracted Token:", token);

    if (!token) {
        return res.status(401).json({ error: "Token is required" });
    }

    try {
        const decoded = jwt.verify(token, secretKey); // Decode token
        console.log("Decoded Token:", decoded);

        const vendor = await Vendor.findById(decoded.vendorId);
        if (!vendor) {
            return res.status(404).json({ error: "Vendor not found" });
        }

        req.vendorId = vendor._id; // Pass vendor ID to next middleware
        next();
    } catch (error) {
        console.error("Token verification error:", error.message);
        return res.status(403).json({ error: "Invalid or expired token" });
    }
};

module.exports = verifyToken;

// dotEnv.config()
// const secretKey=process.env.WhatIsYourName

// const verifyToken=async(req,res,next)=>{
//     console.log("Headers received:", req.headers);

//     const token = req.headers.authorization?.split(" ")[1] || req.headers.token;

//     console.log("Extracted Token:", token);

//     // const token = req.headers.authorization?.split(" ")[1];
//     // const token=req.headers.token;
     
//     if (!token) {
//         return res.status(401).json({ error: "Token is required" });
//     }
    
//     try{
//         const decoded=jwt.verify(token,secretKey) //token decoding
//         const vendor=await Vendor.findById(decoded.vendorId);

//         if (!vendor) {
//             return res.status(404).json({ error: "Vendor not found" });
//         }

//         req.vendorId=vendor._id //if try block is executed successfully "next()" function is executed
//         next();

//     }catch(error){
//             console.error(error)
//         return res.status(500).json({error:"Invalid Token"});
//     }
// };

// module.exports=verifyToken;
