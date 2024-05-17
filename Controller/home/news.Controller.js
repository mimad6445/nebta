const news = require('../../model/home/news.model')


const createNews = async (req,res)=>{
    try{
        const {
            Image
        } = req.body;
        
        const newNews = new news({
            Image
        });
        
        await newNews.save()
    res.status(201).json({ success: true, message: 'News added successfully', news: newNews });
}catch (error) {
    
    res.status(500).json("error",error)
    
}}


const deleteNews = async (req, res) => {
    try {
        const codeId = req.params.id;
        const code = await news.findOneAndDelete({ _id: codeId });
        if (!code) {
            return res.status(404).json({ success: false, message: 'news not found' });
        }
        res.status(200).json({ success: true, message: 'News deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


const getOneNew = async (req, res) => {
    try {
        const newsId = req.params.id; 
        const News = await news.findById(newsId); 
        if (!News) {
            return res.status(404).json({ message: 'News not found' });
        }

        res.status(200).json(News); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateNews = async (req, res) => {
    try {
        const newsId = req.params.id;
        const updates = req.body;

        const News = await news.findByIdAndUpdate(newsId, updates, { new: true });

        if (!News) {
            return res.status(404).json({ success: false, message: 'News not found' });
        }
        res.status(200).json({ success: true, message: 'news updated successfully', News });
        
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
const getAllNews = async (req, res) => {
    try {
        const newss = await news.find(); 
        res.status(200).json({ success: true, data: { newss } }); 
    } catch (error) {
        // If an error occurs, send an error response with the error message
        res.status(500).json({ message: error.message }); 
    }
};


module.exports = {
    createNews,
    deleteNews,
    getAllNews,
    getOneNew,
    updateNews
  };