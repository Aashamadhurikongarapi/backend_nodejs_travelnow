const Product=require('../models/Product');
const multer=require('multer');
const Firm=require('../models/Firm');


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

// const addProduct = async (req, res) => {
//     try {
//         const { vehicle_type, seating_capacity, fecilities_available, price, description } = req.body;

//         const image = req.file ? req.file.filename : undefined;

//         const firmId = req.params.firmId;
//         const firm = await Firm.findById(firmId);

//         if (!firm) {
//             return res.status(400).json({ error: "No firm found" });
//         }

//         // Create a new product
//         const product = new Product({
//             vehicle_type, 
//             seating_capacity, 
//             fecilities_available, 
//             price, 
//             image, 
//             description, 
//             firm: firm._id
//         });

//         const savedProduct = await product.save();

//         // **Ensure firm.products array is updated correctly**
//         await Firm.findByIdAndUpdate(
//             firmId,
//             { $push: { products: savedProduct._id } },  // Push product ID into firm.products
//             { new: true }
//         );

//         res.status(200).json(savedProduct);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// };

const addProduct=async(req,res)=>{
    try{
        const {vehicle_type, seating_capacity, fecilities_available, price,description}=req.body;

        const image=req.file?req.file.filename:undefined;

        const firmId=req.params.firmId;
        const firm =await Firm.findById(firmId);
        if (!firm){
            return res.status(400).json({error:"No firm found"});
        }
        // res.status(200).json(firm)
        //if firm is found then product is pushed to database of firm
        const product=new Product({
            vehicle_type, seating_capacity, fecilities_available, price,image,description, firm:firm._id
        }) 

        const savedProduct=await product.save();

        firm.products.push(savedProduct._id); //pushing the saved data into firm 

        await firm.save()

        res.status(200).json(savedProduct)
    }catch(error){
        console.error(error);
        res.status(500).json({error:"internal server error"});
    }
};

// const getProductByFirm = async (req, res) => {
//     try {
//         const firmId = req.params.firmId;
//         const firm = await Firm.findById(firmId).populate('products');  // Populate products array

//         if (!firm) {
//             return res.status(404).json({ error: "No firm found" });
//         }

//         res.status(200).json(firm.products);  // Return only products array
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// };

const getProductByFirm= async(req,res)=>{
    try{
        const firmId=req.params.firmId;
        const firm =await Firm.findById(firmId);

        if(!firm){
            return res.status(404).json({error:"not firm found"});
        }
        const products=await Product.find({firm:firmId});
        res.status(200).json(products);
    }catch(error){
        console.error(error);
        res.status(500).json({error:"internal server error"});
    }
}

const deleteProductById=async(req,res)=>{
    try{
        const productId=req.params.productId;

        const deleteProduct=await Product.findByIdAndDelete(productId);

        if (!deleteProduct){
            return res.status(404).json({error:"no product found"});
        }
    }catch(error){
        console.error(error);
        res.status(500).json({error:"internal server error"});    
    }
}
module.exports={addProduct:[upload.single('image'),addProduct],getProductByFirm,deleteProductById};

