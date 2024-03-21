const {Task} = require("../Database/database");

const getAll =async(req, res) => {
try {
    const task = await Task.findAll();
    res.json(task);
} catch (error) {
    console.error(error);
}
};

const del =async(req, res) => {
    try {
        const task = await Task.destroy(
            {where:
                {TaskID: req.params.id}
            });
        res.json(task);
    } catch (error) {
        console.error(error);
    }
    };

const add = async (req, res) => {
    const newtask = req.body 
 try {
    const  newTask=await Task.create(newtask);
     if(!newTask){
        return res.status(400).
        json({message: "Error creating the task"})
     }else{
         res.status(201).
         json({message:"The task has been created", data: newTask});
     }
 } catch (error) {  
     console.log(error);
    
 }
};

const upd = async (req, res) => {
    console.log(req.body);
    console.log(req.params.id);
    try {
        const result = await Task.update(req.body, {
            where: {
                TaskID: req.params.id
            }
        });
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while updating the task.' });
    }
};


module.exports = { getAll,add,upd,del };
