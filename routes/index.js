/******* 總路由器 *******/

const express = require('express')  // 載入 express
const router = express.Router()     // 載入 express 的路由模組

const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const users = require('./modules/users')

router.use('/', home)                     // 當路徑是 '/' ，就執行 './modules/home' 裡的程式
router.use('/restaurants', restaurants)   // 當路徑是 '/restaurants' ，就執行 './modules/restaurants' 裡的程式
router.use('/users', users)

module.exports = router