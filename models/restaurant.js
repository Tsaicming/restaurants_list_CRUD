const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantSchema = new Schema({
  name: { type: String, required: true },
  name_en: { type: String, required: true },
  category: { type: String },
  image: { type: String },
  location: { type: String },
  phone: { type: String },
  google_map: { type: String },
  rating: { type: Number, required: true },
  description: { type: String },
  // 加入與 User 的關聯設定
  userId: { type: Schema.Types.ObjectId, ref: 'User', index: true, required: true }
})

//把這份 Schema 命名為 Restaurant
module.exports = mongoose.model('Restaurant', restaurantSchema)