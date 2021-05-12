import Product from '../models/Product';


export const getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category');

        res.status(201).json(products);
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "An error occured"});
    }
}


export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({message: "An error occured"});
    }
}


export const createProduct = async (req, res) => {
    try {
        console.log(req.body);
        const newProduct = new Product(req.body);
        const productSaved = await newProduct.save();

        res.status(201).json(productSaved);
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "An error occured"});
    }
}

export const updateProductById = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, {
            new: true
        });

        res.status(204).json(updatedProduct);
    } catch (error) {
        res.status(400).json({message: "An error occured"});
    }

}


export const deleteProductById = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.productId);
        console.log(deletedProduct);
        res.status(204).json();
    } catch (error) {
        res.status(400).json({message: "An error occured"});
    }
    
}