const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OfficeSchema = new Schema({
    type: {
        type: Schema.Types.String,
        required: true
    },
    title: {
        type: Schema.Types.String,
        required: true
    },
    address: {
        type: Schema.Types.String,
        required: true
    }
})

module.exports = {
    Office : mongoose.model("office" , OfficeSchema)
}