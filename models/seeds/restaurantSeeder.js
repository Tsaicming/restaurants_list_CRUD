const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const restaurantsSeed = require('../seeds/restaurant.json').results

mongoose.connect('mongodb://localhost/restaurants-list')

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')

  for (let i = 0; i < restaurantsSeed.length; i++) {
    Restaurant.create({
      name: restaurantsSeed[i].name,
      name_en: restaurantsSeed[i].name_en,
      category: restaurantsSeed[i].category,
      image: restaurantsSeed[i].image,
      location: restaurantsSeed[i].location,
      phone: restaurantsSeed[i].phone,
      google_map: restaurantsSeed[i].google_map,
      rating: restaurantsSeed[i].rating,
      description: restaurantsSeed[i].description
    })
  }

  console.log('seeder finished!')
})