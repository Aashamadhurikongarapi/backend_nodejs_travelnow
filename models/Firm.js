const mongoose=require('mongoose');
const FirmSchema=new mongoose.Schema({
    firmName:{
        type:String,
        required:true,
        
    },
    area:{
        type:String,
        require:true
    },
    // operatingRegions:{
    //     type:String,
        
    // },
    firmType:{
        type:[{
            type:String,
            enum:['Travel-Agency','Individual-Owner'],
            require:true
        }]
    },
    image:{
        type:String

    },  
    vendor:[{ //connecting FIrm to Vendor //should npt be an arrya, should be an onject
            type:mongoose.Schema.Types.ObjectId,
            ref:'Vendor'
        }],
    products: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product' 
    }]
        
    // products:[{ //conecting Product to Firm
    //         type:mongoose.Schema.Types.ObjectId,
    //         ref:'Product'
    //     }]
});

const Firm=mongoose.model('Firm',FirmSchema);
module.exports=Firm
