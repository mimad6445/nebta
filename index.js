const express = require('express')
const Connectdb = require('./connection/Connectdb')
const bodyParser = require('body-parser')
const httpStatusText = require('./utils/httpStatusText');
const cors = require('cors')
const virefyToken = require("./middleware/virefytoken")
require('dotenv').config()


const productRouter = require('./router/productRouter')
const articleRouter = require('./router/home/article.Router')
const CodePromoRouter = require('./router/home/CodePromo.Router')
const NewsRouter = require('./router/home/news.Router')
const offrePromotionRouter = require('./router/home/OffrePromotion.Router')
const ConseilleRouter = require("./router/home/Conseille.Router")
const AdminRouter = require("./router/auth/admin.Router");
const ProfileRouter = require("./router/auth/Profile.Router")
const AccountRouter = require("./router/auth/Account.Router")

const app = express()

Connectdb()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/api/product',productRouter)
app.use('/api/article',articleRouter)
app.use('/api/CodePromo',CodePromoRouter)
app.use('/api/news',NewsRouter)
app.use('/api/offredePromotion',offrePromotionRouter);
app.use('/api/Conseille',ConseilleRouter);
app.use('/api/admin',AdminRouter);
app.use('/api/Profile',virefyToken,ProfileRouter);
app.use('/api/Account',AccountRouter)

const port = process.env.PORT || 8000

app.all('*',(req,res,next)=>{
    res.status(404).json({status : httpStatusText.ERROR , msg : "cannot found data"});
})

app.use('*',(error,req,res,next)=>{
    res.status(error.statusCode || 500).json({status : httpStatusText.ERROR , msg : error.message});
})

app.listen(port,()=>{
    console.log(`Listening to ${port}`)
})