/******* 管理首頁的路由器 *******/

const express = require('express')    // 載入 express
const router = express.Router()       // 載入 express 的路由模組
const Restaurant = require('../../models/restaurant')

// home page (main, index)
router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

//search bar ( index )
router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const userId = req.user._id

  return Restaurant.find({ userId })
    .lean()
    .then(restaurantsList => {
      const restaurants = restaurantsList.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
      })
      res.render('index', { restaurants })
    })
    .catch(error => console.log(error))
})

// sort
router.post('/sort', (req, res) => {
  const sort = req.body.sort
  const resort = {
    asc: { name: 'asc' },
    desc: { name: 'desc' },
    category: { category: 'asc' },
    location: { location: 'asc' }
  }
  const userId = req.user._id

  return Restaurant.find({ userId })
    .lean()
    .sort(resort[sort])
    .then(restaurants => { res.render('index', { restaurants }) })
    .catch(error => console.log(error))
})

module.exports = router