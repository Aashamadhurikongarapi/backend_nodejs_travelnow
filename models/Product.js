const mongoose =require('mongoose');
const productSchema=new mongoose.Schema({
    vehicle_type:{
        type:[{
            type:String,
            enum:['car','Bus','van'],
            require:true //car,bus,van
    }]
    },
    seating_capacity:{
        type:String,
        require:true
    },
    fecilities_available:{
        type:[{
            type:String,
            enum:['AC', 'non AC' , 'Food', 'including rooms']

        }]
    },
    images:{
        type:String,
        require:true
    },
    price:{
        type:String,
        require:true
    },
    description:{
        type:String
    },

    firm:[{  //conecting Product to Firm 
        type:mongoose.Schema.Types.ObjectId,
        ref:"Firm"
    }]
});

const Product=mongoose.model('Product',productSchema);
module.exports=Product