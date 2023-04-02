const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db")
const { authentication } = require("./middlewares/authentication")
const { userRouter } = require("./routes/user_routes")
const { apiRouter } = require("./routes/api_route")
const { passport } = require("./config/googleAuth")
const { sendMail } = require("./middlewares/mail")

const jwt = require("jsonwebtoken")
const { v4: uuidv4 } = require('uuid');
const { userModel } = require("./models/user_model")


const { createClient } = require("redis")
const client = createClient({
    url: process.env.redis
});
client.on('error', err => console.log('Redis Client Error', err));
client.connect();


const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const client_id = "c650422230378f44fe50"
const client_secret = "874445b01f5d0eac1d7c7baea42eea96da114db5"


const path = require("path");
const filePath = path.join(
    __dirname,
    "..",
    "frontend",
    "login.html"
);



const app = express();
app.use(express.json())
app.use(cors())



app.use("/", userRouter)


app.get("/", (req, res) => {
    // res.sendFile(filePath)
    res.send("welcome")
})


app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login', session: false }),
    function (req, res) {
        // Successful authentication, redirect home.
        console.log(req.user)
        res.redirect('/');
    });




app.get("/auth/github", async (req, res) => {
    const { code } = req.query
    const accessToken = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "content-type": "application/json"
        },
        body: JSON.stringify({
            client_id: client_id,
            client_secret: client_secret,
            code
        })
    }).then((res) => res.json())
    // console.log(accessToken);
    const access_token = accessToken.access_token
    const userDetails = await fetch("https://api.github.com/user", {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    }).then((res) => res.json())
    // console.log(userDetails)

    let username = userDetails.name
    let email = userDetails.login

    const userData = await userModel.find({ email })
    if (userData.length > 0) {

        let sub = `Welcome to API ACE`
        let body = `This is Greeting from API ACE, Hope your experience with
                API ACE will be great and user-friendly. \n Thankyou`
        sendMail(sub, body, email)

        const token = jwt.sign({ "id": userData[0]._id }, "normal", { expiresIn: '24h' })
        await client.set('token', token, { EX: 86400 })
        res.sendFile(filePath)
    } else {
        const user = await new userModel({
            username,
            email,
            password: uuidv4(),
            // photo
        })
        await user.save()

        let sub = `Welcome to API ACE`
        let body = `This is Greeting from API ACE, Hope your experience with
                API ACE will be great and user-friendly. \n Thankyou`
        sendMail(sub, body, email)

        const userData = await userModel.find({ email })

        const token = jwt.sign({ "id": userData[0]._id }, "normal", { expiresIn: '24h' })
        await client.set('token', token, { EX: 86400 })

        res.sendFile(filePath)
    }
})




app.use(authentication)
app.use("/", apiRouter)



app.listen(4500, async () => {
    try {
        await connection;
        console.log("DB connected successfully")
    } catch (error) {
        console.log("Not connect DB" + error)
    }
    console.log("Server is Running at port 4500")
})