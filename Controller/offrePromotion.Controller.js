const offrePromotion = require('../model/home/OffreEtPromotion')


const createOffre = async (req,res)=>{
    try{
        const {
            titre,
            Image,
        } = req.body;
        
        const newOffre = new offrePromotion({
            titre,
            Image
        });
        
        await newOffre.save()
    res.status(201).json({ success: true, message: 'Offre added successfully', offre: newOffre });
}catch (error) {
    
    res.status(500).json("error",error)
    
}}


const deleteOffre = async (req, res) => {
    try {
        const codeId = req.params.id;
        const code = await offrePromotion.findOneAndDelete({ _id: codeId });
        if (!code) {
            return res.status(404).json({ success: false, message: 'Code not found' });
        }
        res.status(200).json({ success: true, message: 'Offre deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const getAllOffre = async (req, res) => {
    try {
        const offres = await offrePromotion.find(); 
        res.status(200).json(offres); 
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
};

const getOneOffre = async (req, res) => {
    try {
        const offreId = req.params.id; 
        const offre = await offrePromotion.findById(offreId); 
        if (!offre) {
            return res.status(404).json({ message: 'Offre not found' });
        }

        res.status(200).json(offre); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateOffre = async (req, res) => {
    try {
        const offreId = req.params.id;
        const updates = req.body;

        const offre = await offrePromotion.findByIdAndUpdate(offreId, updates, { new: true });

        if (!offre) {
            return res.status(404).json({ success: false, message: 'Offre not found' });
        }
        res.status(200).json({ success: true, message: 'offre updated successfully', offre });
        
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


module.exports = {
    createOffre,
    deleteOffre,
    getAllOffre,
    getOneOffre,
    updateOffre
  };