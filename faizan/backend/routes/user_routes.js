const express = require("express")
const { userModel } = require("../models/user_model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const { sendMail } = require("../middlewares/mail")

const { createClient } = require("redis")
const client = createClient({
    url: process.env.redis
});
client.on('error', err => console.log('Redis Client Error', err));
client.connect();


const userRouter = express.Router()

userRouter.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const userData = await userModel.find({ email })
        if (userData.length > 0) {
            res.status(200).send({
                "ok": false,
                "message": "User already exists - Plz login",
            })
        } else {
            bcrypt.hash(password, 3, async function (err, hashed) {
                const data = new userModel({ username, email, password: hashed })
                await data.save()
                let sub = `Welcome to API ACE`
                let body = `This is Greeting from API ACE, Hope your experience with
                API ACE will be great and user-friendly.`
                sendMail(sub, body, email)
                res.status(200).send({
                    "ok": true,
                    "message": "Sign-Up Successfully",
                    data
                })
            })
        }

    } catch (error) {
        console.log(error)
        res.status(401).send({
            "message": "Sign-Up Error",
            error
        })
    }
})


userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const userData = await userModel.find({ email })
        if (userData.length > 0) {
            bcrypt.compare(password, userData[0].password, async function (err, result) {
                if (result) {
                    const token = jwt.sign({ "id": userData[0]._id }, "normal", { expiresIn: '24h' })
                    const re_token = jwt.sign({ "id": userData[0]._id }, "refresh", { expiresIn: '7d' })

                    await client.set('token', token, { EX: 86400 })
                    await client.set('re_token', re_token, { EX: 604800 })

                    let sub = `Welcome to API ACE`
                    let body = `This is Greeting from API ACE, Hope your experience with
                          API ACE will be great and user-friendly. \n Thankyou`
                    sendMail(sub, body, email)

                    res.status(200).send({
                        "ok": true,
                        "message": "Log-In Successfully",
                        "username": userData.username,
                        "token": token,
                        "re_token": re_token
                    })
                } else {
                    res.status(401).send({
                        "message": "Wrong Credentials - Incorrect Password"
                    })
                }
            })
        } else {
            res.status(401).send({
                "message": "Wrong Credentials - Incorrect E-Mail"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(401).send({
            "message": "Log-In Error",
            error
        })
    }
})


userRouter.get("/logout", async (req, res) => {
    const token = await client.get('JWTtoken')
    // const token = req.headers.authorization;

    try {
        if (token) {
            await client.lPush('BlackListed', token, { EX: 604800 })

            res.status(200).send({
                "message": "Log-Out Successfull"
            })
        } else {
            res.status(401).send({
                "message": "Please Log-In first"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(401).send({
            "message": "Logout Error",
            error
        })
    }
})



userRouter.get("/newToken", async (req, res) => {
    // const token = req.headers.authorization;
    const token = await client.get('refreshToken')

    try {
        if (token) {
            const decoded = jwt.verify(token, "refresh");
            if (decoded) {
                const New_token = jwt.sign({ "role": decoded.role }, "normal", { expiresIn: '24h' })
                await client.set('token', New_token, { EX: 86400 })
                res.status(200).send({
                    "message": "Again Log-In Successfull",
                    "token": New_token
                })
            } else {
                res.status(401).send({
                    "message": "Please Log-In first - Refresh JWT Expired"
                })
            }
        } else {
            res.status(401).send({
                "message": "Please Log-In first"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(401).send({
            "message": "Refresh Token Error",
            error
        })
    }
})


userRouter.post("/otp", async (req, res) => {
    const email = req.body.email
    try {
        const userData = await userModel.find({ email })
        if (userData.length > 0) {
            let num = Math.floor(Math.random() * 9000 + 1000)
            let sub = `OTP for resetting the API ACE Password`
            let body = `This is Your OTP - ${num} for resetting the API ACE password, Keep it confedential.`
            sendMail(sub, body, email)
            res.send({
                "ok": true,
                "message": num
            })
        } else {
            res.send({
                "message": "Incorrect E-Mail"
            })
        }
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})


userRouter.patch("/reset", async (req, res) => {
    try {
        const payload = req.body;

        const email = payload.email
        const password = payload.password

        const userData = await userModel.find({ email })

        if (userData.length > 0) {
            const ID = userData[0]._id;
            bcrypt.hash(password, 3, async function (err, hashed) {
                const edited = { password: hashed }
                await userModel.findByIdAndUpdate({ "_id": ID }, edited)
                res.status(200).send({
                    "ok": true,
                    "message": "Password Re-Set Successfully",
                })
            })
        } else {
            res.send({ "message": "Incorrect Email" })
        }

    } catch (error) {
        console.log(error)
        res.send(error)
    }
})



module.exports = { userRouter }