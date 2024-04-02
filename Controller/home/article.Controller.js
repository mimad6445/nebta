const article = require('../../model/home/article.model')


const createArticle = async (req,res)=>{
    try{
        const {
            titleOfWriter,
            imageOfArticle,
            description,
            link,
            counter,
        } = req.body;
        
        const newArticle = new article({
            titleOfWriter,
            imageOfArticle,
            description,
            link,
            counter,
        });
        
        await newArticle.save()
    res.status(201).json({ success: true, message: 'Article added successfully', article: newArticle });
}catch (error) {
    
    res.status(500).json("nkmk sayah",error)
    
}}


const deleteArticle = async (req, res) => {
    try {
        const articleId = req.params.id;

        const Article = await article.findById(productId);
        if (!Article) {
            return res.status(404).json({ success: false, message: 'Article not found' });
        }

        await article.findByIdAndDelete(articleId);

        res.status(200).json({ success: true, message: 'Article deleted successfully' });
    } catch (error) {
        console.error('Error deleting article:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const getAllArticle = async (req, res) => {
    try {
        const articls = await article.find(); 
        res.status(200).json(articls); 
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
};

const getOneArticle = async (req, res) => {
    try {
        const articleId = req.params.id; 
        const article = await article.findById(articleId); 
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        res.status(200).json(article); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateArticle = async (req, res) => {
    try {
        const articleId = req.params.id;
        const updates = req.body;

        const Article = await article.findByIdAndUpdate(articleId, updates, { new: true });

        if (!Article) {
            return res.status(404).json({ success: false, message: 'Article not found' });
        }
        res.status(200).json({ success: true, message: 'Article updated successfully', Article });
    
    } catch (error) {
        console.error('Error updating Article:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


module.exports = {
    createArticle,
    deleteArticle,
    getAllArticle,
    getOneArticle,
    updateArticle
  };