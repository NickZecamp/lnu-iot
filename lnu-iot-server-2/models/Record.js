const {Schema, model} = require("mongoose")

const Record = new Schema({
    date : {type: Date, required: true, default: Date.now},
    labels: {type: Object, required: false},
})

module.exports = model('Record', Record)