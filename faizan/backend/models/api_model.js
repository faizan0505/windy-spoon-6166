const mongoose = require("mongoose")

const apiSchema = mongoose.Schema({
    api_link: String,
    userID: String
}, {
    versionKey: false
})

const apiModel = mongoose.model("Api-Link", apiSchema)

module.exports = { apiModel }