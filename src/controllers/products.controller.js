import Product from '../models/Product';

import * as paginationController from "./pagination.controller";
/*
    Para hacer Create, necesita el formato normal
    {
        "name": "Patatas bravas",
        "price": 5.5,
        "category": "iddelacategoria"
    }

    Para hacer GET, la salida sale expandida, en este caso la categoría:
    {
        "id": "elid"
        "name": "Patatas bravas"
        "price": 5.5,
        "category": {
            "id": "iddelacategoria"
            "name": "Platos"
        }
    }
*/

export const getProducts = async (req, res) => {

    // {
    //     "filter" : {
    //       "field": "name"
    //       "sort": "asc"
    //       "contains": "bebida"
    //     }
    //   }


    let page = req.query.page
    let filter = req.body.filter
    try {
        if (page) {
            paginationController.pagination(page, res, Product, filter,Product.find(filter).sort("name").populate("category"))

        } else {
            const products = await Product.find().populate('category').sort('name')
            //const productsFilter = products.filter((product) => (product.category.name === "Bebidas"))
            res.status(201).json(products);
        }

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "An error occured" });
    }
}

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId).populate('category');
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: "An error occured" });
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
        res.status(400).json({ message: "An error occured" });
    }
}

export const updateProductById = async (req, res) => {
    try {
        console.log(req.body);
        const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, {
            new: true
        });

        res.status(204).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: "An error occured" });
    }

}


export const deleteProductById = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.productId);
        console.log(deletedProduct);
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ message: "An error occured" });
    }

}