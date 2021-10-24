// const mongoose = require('mongoose')
// const Restaurant = require('../restaurant')
// const restaurantsSeed = require('../seeds/restaurant.json').results

// mongoose.connect('mongodb://localhost/restaurant-list')

// const db = mongoose.connection
// db.on('error', () => {
//   console.log('mongodb error!')
// })

// db.once('open', () => {
//   console.log('mongodb connected!')

//   for (let i = 0; i < restaurantsSeed.length; i++) {
//     Restaurant.create({
//       name: restaurantsSeed[i].name,
//       name_en: restaurantsSeed[i].name_en,
//       category: restaurantsSeed[i].category,
//       image: restaurantsSeed[i].image,
//       location: restaurantsSeed[i].location,
//       phone: restaurantsSeed[i].phone,
//       google_map: restaurantsSeed[i].google_map,
//       rating: restaurantsSeed[i].rating,
//       description: restaurantsSeed[i].description
//     })
//   }

//   console.log('seeder finished!')
// })

const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const User = require('../user')
const restaurantsSeed = require('../seeds/restaurant.json').results

const SEED_USER = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678',
    restaurantID: [1, 2, 3]
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678',
    restaurantID: [4, 5, 6]
  }
]

mongoose.connect('mongodb://localhost/restaurant-list')
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')

  Promise.all(SEED_USER.map(SEED_USERS =>
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(SEED_USERS.password, salt))
      .then(hash => User.create({
        name: SEED_USERS.name,
        email: SEED_USERS.email,
        password: hash
      }))
      .then(user => {
        const restaurants = restaurantsSeed.filter(restaurant => SEED_USERS.restaurantID.includes(restaurant.id))
        restaurants.forEach(restaurant => { restaurant.userId = user._id })
        return Restaurant.create(restaurants)
      })
  ))
    .then(() => {
      console.log('done')
      process.exit()
    })
    .catch(err => console.log(err))
})