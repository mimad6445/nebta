const express = require('express')
const Connectdb = require('./database/Connectdb')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()


const productRouter = require('./router/productRouter')
const articleRouter = require('./router/article.Router')
const CodePromoRouter = require('./router/CodePromo.Router')
const NewsRouter = require('./router/news.Router')
const offrePromotionRouter = require('./router/OffrePromotion.Router')

const app = express()

Connectdb()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/api/product',productRouter)
app.use('/api/article',articleRouter)
app.use('/api/CodePromo',CodePromoRouter)
app.use('/api/news',NewsRouter)
app.use('/api/offredePromotion',offrePromotionRouter)




const port = process.env.PORT || 8000


app.listen(port,()=>{
    console.log(`Listening to ${port}`)
})