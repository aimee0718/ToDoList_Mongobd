var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/lists')

var listSchema = new mongoose.Schema({
    text: {
        type: String,
        require: true
    },
    status: {
        type: Boolean,
        enum: [true, false],
        default: false,
        require: true
    }
})

module.exports = mongoose.model('List', listSchema)