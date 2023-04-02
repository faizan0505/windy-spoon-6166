const mongoose = require("mongoose")

const apiSchema = mongoose.Schema({
    method: String,
    url: String,
    userID: String
}, {
    versionKey: false
})

const apiModel = mongoose.model("Api-Link", apiSchema)

module.exports = { apiModel }