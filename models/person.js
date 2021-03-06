var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
var url = process.env.MONGODB_URI;
console.log('connectiong to', url);
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(function (result) {
    console.log('connectedMongoDB');
})["catch"](function (error) {
    console.log('error connectiong to MongoDB', error);
});
var phoneBookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    }
});
phoneBookSchema.set('toJSON', {
    transform: function (document, retrunedObject) {
        retrunedObject.id = retrunedObject._id.toString();
        delete retrunedObject._id;
        delete retrunedObject.__v;
    }
});
module.exports = mongoose.model('PhoneBook', phoneBookSchema);
