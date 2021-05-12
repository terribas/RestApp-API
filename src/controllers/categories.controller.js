import Category from '../models/Category';


export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();

        res.status(201).json(categories);
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "An error occured"});
    }
}


export const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.categoryId);
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({message: "An error occured"});
    }
}


export const createCategory = async (req, res) => {
    try {
        const newCategory = new Category(req.body);
        const categorySaved = await newCategory.save();

        res.status(201).json(categorySaved);
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "An error occured"});
    }
}

export const updateCategoryById = async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(req.params.categoryId, req.body, {
            new: true
        });

        res.status(204).json(updatedCategory);
    } catch (error) {
        res.status(400).json({message: "An error occured"});
    }

}


export const deleteCategoryById = async (req, res) => {
    try {
        const deletedCategory = await Product.findByIdAndDelete(req.params.categoryId);
        console.log(deletedCategory);
        res.status(204).json();
    } catch (error) {
        res.status(400).json({message: "An error occured"});
    }
    
}