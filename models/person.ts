const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const url = process.env.MONGODB_URI


console.log('connectiong to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(result => {
  console.log('connectedMongoDB')
})
.catch(error => {
  console.log('error connectiong to MongoDB', error)
})


const phoneBookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  }
})

phoneBookSchema.set('toJSON', {
  transform: (document, retrunedObject) => {
    retrunedObject.id = retrunedObject._id.toString()
    delete retrunedObject._id
    delete retrunedObject.__v
  }
})

module.exports = mongoose.model('PhoneBook', phoneBookSchema)
