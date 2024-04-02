const express = require('express')
const Connectdb = require('./database/Connectdb')
const bodyParser = require('body-parser')
const httpStatusText = require('./utils/httpStatusText');
const cors = require('cors')
require('dotenv').config()


const productRouter = require('./router/productRouter')
const articleRouter = require('./router/home/article.Router')
const CodePromoRouter = require('./router/home/CodePromo.Router')
const NewsRouter = require('./router/home/news.Router')
const offrePromotionRouter = require('./router/home/OffrePromotion.Router')
const ConseilleRouter = require("./router/home/Conseille.Router")

const app = express()

Connectdb()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/api',productRouter)
app.use('/api/article',articleRouter)
app.use('/api/CodePromo',CodePromoRouter)
app.use('/api/news',NewsRouter)
app.use('/api/offredePromotion',offrePromotionRouter)
app.use('/api/Conseille',ConseilleRouter);



const port = process.env.PORT || 8000

app.all('*',(req,res,next)=>{
    res.json({status : httpStatusText.ERROR , msg : "cannot found data"});
})

app.listen(port,()=>{
    console.log(`Listening to ${port}`)
})