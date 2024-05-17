const codePromo = require('../../model/home/CodePromo.model')
const eventEmitter = require("../../utils/eventEmitter")

const createCode = async (req,res)=>{
    try{
        const {
            code,
            Image,
            discount
        } = req.body;
        
        const newCode = new codePromo({
            code,
            Image,
            discount
        });
        await newCode.save()
        eventEmitter.emit('addCodePromo',newCode);
    res.status(201).json({ success: true,  code: newCode });
}catch (error) {
    
    res.status(500).json("error")
    
}}


const deleteCode = async (req, res) => {
    try {
        const codeId = req.params.id;
        const code = await codePromo.findById(codeId);
        
        if (!code) {
            return res.status(404).json({ success: false, message: 'Code not found' });
        }
        
        await codePromo.findByIdAndDelete(codeId);
        eventEmitter.emit('deleteCode', codeId);
        
        res.status(200).json({ success: true, message: 'Code deleted successfully' });
    } catch (error) {
        console.error('Error deleting code:', error); // Log the error for debugging
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


const getAllCode = async (req, res) => {
    try {
        const code = await codePromo.find(); 
        res.status(200).json(code); 
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
};

const getOneCode = async (req, res) => {
    try {
        const codeId = req.params.id; 
        const code = await CodePromo.findById(codeId); 
        if (!code) {
            return res.status(404).json({ message: 'Code not found' });
        }

        res.status(200).json(code); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateCode = async (req, res) => {
    try {
        const CodeId = req.params.id;
        const updates = req.body;

        const code = await codePromo.findByIdAndUpdate(CodeId, updates, { new: true });

        if (!code) {
            return res.status(404).json({ success: false, message: 'Code not found' });
        }
        eventEmitter.emit('updateCode',CodeId);
        res.status(200).json({ success: true, message: 'Code updated successfully', code });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


module.exports = {
    createCode,
    deleteCode,
    getAllCode,
    getOneCode,
    updateCode
};