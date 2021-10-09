const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const restaurantList = require('./restaurant.json')
const mongoose = require('mongoose')  //載入 mongoose
const bodyParser = require('body-parser')
const routes = require('./routes')    // 載入路由器，會自動去尋找目錄下 index.js 的檔案

mongoose.connect('mongodb://localhost/restaurant-list')  //連線到 mongoDB


/*******  取得 mongoDB 連線狀態  *******/
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})
/**************************************/


app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})



