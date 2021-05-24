import Table from '../models/Table';


export const getTables = async (req, res) => {
    try {
        const tables = await Table.find().sort('table_number');
        res.status(201).json(tables);
    } catch (error) {
        res.status(400).json({message: "An error occured"});
    }
}


export const getTableById = async (req, res) => {
    try {
        const table = await Product.findById(req.params.tableId);
        res.status(201).json(table);
    } catch (error) {
        res.status(400).json({message: "An error occured"});
    }
}

//client need waiter
export const turnTableStatus = async (req, res) => {
    try {
        const foundTable = await Table.findById(req.params.tableId);

        const updatedTable = await Table.findByIdAndUpdate(req.params.tableId, {
            need_waiter: !foundTable.need_waiter
        }, {new: true});

        res.status(200).json(updatedTable);
    } catch (error) {
        res.status(400).json({message: "An error occured"})
    }
}


export const createTable = async (req, res) => {
    try {
        const {table_number} = req.body;

        if (!table_number) return res.status(400).json({message: "Table number must be provided"});
    
        const newTable = new Table(req.body);
        const tableSaved = await newTable.save();

        res.status(201).json(tableSaved);
    } catch (error) {
        res.status(400).json({message: "An error occured"});
    }
}

export const updateTableById = async (req, res) => {
    try {
        const updatedTable = await Table.findByIdAndUpdate(req.params.tableId, req.body, {
            new: true
        });

        res.status(204).json(updatedTable);
    } catch (error) {
        res.status(400).json({message: "An error occured"});
    }

}


export const deleteTableById = async (req, res) => {
    try {
        const deletedTable = await Table.findByIdAndDelete(req.params.tableId);
        console.log(deletedTable);
        res.status(204).json();
    } catch (error) {
        res.status(400).json({message: "An error occured"});
    }
    
}