const codePromo = require('../../model/home/CodePromo.model')


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
    res.status(201).json({ success: true, message: 'Code added successfully', code: newCode });
}catch (error) {
    
    res.status(500).json("error",error)
    
}}


const deleteCode = async (req, res) => {
    try {
        const CodeId = req.params.id;

        const code = await codePromo.findById(CodeId);
        if (!code) {
            return res.status(404).json({ success: false, message: 'Code not found' });
        }
        await code.findByIdAndDelete(CodeId);

        res.status(200).json({ success: true, message: 'code deleted successfully' });
    } catch (error) {
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
        const code = await offrePromotion.findById(codeId); 
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