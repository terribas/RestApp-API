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




// {
//    "where" : {
//       "field": "category",
//       "value": "Bebidas"
//    },
//
//    "contains": "coc",
//
//    "sort": {
//        "field": "name",
//        "order": "asc"
//    }
// }


export const getProducts = async (req, res) => {
    try {
        const page = req.query.page;
        if (page) {
            const {where, contains, sort} = req.body;

            const filter = {
                $or: [
                    {name: {$regex: new RegExp(contains, 'i')}},
                    {category: {$regex: new RegExp(contains, 'i')}},
                ]
            }
            const sortQuery = {}

            if (where.field && where.value) {filter[where.field] = where.value}
            if (sort.field && sort.order) {sortQuery[sort.field] = sort.order}

            console.log('El filtro es ' + JSON.stringify(filter));
            paginationController.pagination({page, res, model: Product, filter, promise: Product.find(filter).sort(sortQuery)})

        } else {
            const products = await Product.find().sort('name')
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