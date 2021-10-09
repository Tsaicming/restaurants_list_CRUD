/******* 管理首頁的路由器 *******/

const express = require('express')    // 載入 express
const router = express.Router()       // 載入 express 的路由模組
const Restaurant = require('../../models/restaurant')

// home page (main, index)
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

module.exports = router