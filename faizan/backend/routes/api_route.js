const { apiModel } = require("../models/api_model")
const express = require("express")

const apiRouter = express.Router()


apiRouter.get("/api", async (req, res) => {
    let query = req.query;
    try {
        const apis = await apiModel.find(query)
        res.send({
            "ok":true,
            apis
        })
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

apiRouter.post("/addapi", async (req, res) => {
    const payload = req.body;
    try {
        const apiData = await new apiModel(payload)
        await apiData.save()
        res.send({
            "ok": true,
            "message": "api saved"
        })
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})


apiRouter.delete("/delete/:id", async (req, res) => {
    const ID = req.params.id;
    try {
        await apiModel.findByIdAndDelete({ "_id": ID })
        res.send({
            "ok": true,
            "message": "Deleted"
        })
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

module.exports = { apiRouter }