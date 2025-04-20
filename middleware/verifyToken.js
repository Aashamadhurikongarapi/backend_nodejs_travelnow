const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const dotEnv = require('dotenv');

dotEnv.config()

const secretKey = process.env.WhatIsYourName


const verifyToken = async(req, res, next) => {
    const token = req.headers.token;

    if (!token) {
        return res.status(401).json({ error: "Token is required" });
    }
    try {
        const decoded = jwt.verify(token, secretKey)
        const vendor = await Vendor.findById(decoded.vendorId);

        if (!vendor) {
            return res.status(404).json({ error: "vendor not found" })
        }

        req.vendorId = vendor._id

        next()
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "Invalid token" });
    }

}

module.exports = verifyToken



//below code worked fine till now but i am taking suby's code and adding at the top 

// const jwt = require('jsonwebtoken');
// const Vendor = require('../models/Vendor');
// const dotenv = require('dotenv');

// dotenv.config();
// const secretKey = process.env.WhatIsYourName;

// const verifyToken = async (req, res, next) => {
//    try {
//       const authHeader = req.headers.authorization;
//       if (!authHeader || !authHeader.startsWith('Bearer ')) {
//          return res.status(401).json({ error: "No token provided or invalid format" });
//       }

//       const token = authHeader.split(' ')[1]; // Extract token
//       const decoded = jwt.verify(token, secretKey);
//       const vendor = await Vendor.findById(decoded.vendorId);

//       if (!vendor) {
//          return res.status(404).json({ error: "Vendor not found" });
//       }

//       req.vendorId = vendor._id;
//       next();
//    } catch (error) {
//       console.error("Token verification error:", error.message);
//       return res.status(403).json({ error: "Invalid or expired token" });
//    }
// };

// module.exports = verifyToken;





// for addfirm.js i am changing this orginal above code to below one(from chatgpt)

// const verifyToken = async (req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1]; // Bearer token
  
//     if (!token) {
//       return res.status(401).json({ message: 'Token not provided' });
//     }
  
//     try {
//       const decoded = jwt.verify(token, process.env.WhatIsYourName); // Use your actual secret key
//       const vendor = await Vendor.findById(decoded.id);
  
//       if (!vendor) {
//         return res.status(404).json({ message: 'Vendor not found' });
//       }
  
//       req.vendorId = vendor._id; // Pass vendorId to controller
//       next();
//     } catch (err) {
//       console.error(err);
//       return res.status(403).json({ message: 'Invalid token' });
//     }
//   };
  
//   module.exports = verifyToken;