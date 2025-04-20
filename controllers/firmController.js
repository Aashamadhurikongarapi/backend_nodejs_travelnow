const Firm = require('../models/Firm');
// const firm =require('../models/Firm');
const Vendor=require('../models/Vendor'); //we want firms to be linked with vendor soo need Vendor model tooo
const multer=require('multer');
const path = require('path');



    //multer config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Destination folder where the uploaded images will be stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Generating a unique filename
    }
});

const upload = multer({ storage: storage });

const addFirm=async(req,res)=>{
    try{
    const {firmName, area, firmType}=req.body

    if (!firmName) {
        return res.status(400).json({ error: "firmName is required" });
      }

    const image=req.file?req.file.filename:undefined;

    const vendor=await Vendor.findById(req.vendorId) //getting vendor

    if (!vendor){  //if vendor is not found
        res.status(404).json({message: "vendor not found"})
    }

    const firm=new Firm({
        firmName, area, firmType, image, vendor:vendor._id 
    })

    const savedFirm=await firm.save(); //saving firm detials under vendor in database 

    vendor.firm.push(savedFirm)

    await vendor.save()
    
    return res.status(200).json({message:'firm added successfully'})

    }catch(error){ //if adding firm is failed
        console.error(error)
        res.status(500).json("internal logic error")

    }

}

const deleteFirmById=async(req,res)=>{
    try{
        const firmId=req.params.firmId;

        const deleteProduct=await Firm.findByIdAndDelete(firmId);

        if (!deleteProduct){
            return res.status(404).json({error:"no product found"});
        }
    }catch(error){
        console.error(error);
        res.status(500).json({error:"internal server error"});    
    }
}

module.exports={addFirm:[upload.single('image'),addFirm],deleteFirmById}
