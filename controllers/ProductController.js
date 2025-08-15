const Product = require("../models/ProductModel");


//display all products
const getAllProducts = async (req, res, next) =>{
     
    let products;

    try
    {
        products = await Product.find();

    }
    catch(err)
    {
        console.log(err);
    }
 
    if(!products)
    {
        return res.status(404).json({message:"users not found! try again"});
    }

    //display function
    return res.status(200).json({ products});
 
}

exports.getAllProducts = getAllProducts;