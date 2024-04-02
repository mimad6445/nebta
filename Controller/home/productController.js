const Product = require('../models/product')


const createProduct = async (req,res)=>{
    try{
        const {
            Image,
            ProductName,
            ProductScientificName,
            ProductArabicName,
            Productdesc,
            stock,
            Price,
            PromotionPrice,
            Promotion,
            Indication,
            ContreIndication,
            Propriete,
            ModeUtilisation,
            Precaution,
            aromatherapie,
            epicerie,
        } = req.body;
        
        const newProduct = new Product({
            Image,
            ProductName,
            ProductScientificName,
            ProductArabicName,
            Productdesc,
            stock,
            Price,
            PromotionPrice,
            Promotion,
            Indication,
            ContreIndication,
            Propriete,
            ModeUtilisation,
            Precaution,
            aromatherapie,
            epicerie,
        });
        
        await newProduct.save()
    res.status(201).json({ success: true, message: 'Product added successfully', product: newProduct });
}catch (error) {
    
    res.status(500).json("nkmk sayah",error)
    
}}


const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        await Product.findByIdAndDelete(productId);

        res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find(); 
        res.status(200).json(products); 
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
};

const getOneProduct = async (req, res) => {
    try {
        const productId = req.params.id; 
        const product = await Product.findById(productId); 
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const updates = req.body;

        const product = await Product.findByIdAndUpdate(productId, updates, { new: true });

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({ success: true, message: 'Product updated successfully', product });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


module.exports = {
    createProduct,
    deleteProduct,
    getAllProducts,
    getOneProduct,
    updateProduct
  };