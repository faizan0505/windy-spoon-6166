const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport")
const { v4: uuidv4 } = require('uuid');
const { userModel } = require("../models/user_model.js")
const jwt = require("jsonwebtoken")
const { sendMail } = require("../middlewares/mail.js")

const { createClient } = require("redis")
const client = createClient({
    url: process.env.redis
});
client.on('error', err => console.log('Redis Client Error', err));
client.connect();

passport.use(new GoogleStrategy({
    clientID: "843763919088-55b2f6tp1aamhs94npflcer1i0clc1gp.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:4500/auth/google/callback"
},
    async function (accessToken, refreshToken, profile, cb) {
        // console.log(profile)
        let email = profile._json.email
        let username = profile.given_name
        // let photo = profile.photos[0].value
        const userData = await userModel.find({ email })
        if (userData.length > 0) {

            let sub = `Welcome to API ACE`
            let body = `Dear ${userData[0].username},

            Thanks for Login again API ACE, Welcomes you to our app! We are thrilled to have you join our community and we hope that you will find our app to be a valuable tool for your needs.
            
            Our app has been designed to be user-friendly and intuitive, with a range of features and functions.
           
            Thank you again for choosing API ACE and we hope you enjoy using our app!
            
            Best regards,
            API ACE`
            sendMail(sub, body, email)
            
            const token = jwt.sign({ "id": userData[0]._id }, "normal", { expiresIn: '24h' })
            await client.set('token', token, { EX: 86400 })
            return cb(null, userData)
        } else {
            const user = await new userModel({
                username,
                email,
                password: uuidv4(),
                // photo
            })
            await user.save()

            let sub = `Welcome to API ACE`
            let body = `Dear ${username},

            This is Greeting from API ACE, Welcomes you to our app! We are thrilled to have you join our community and we hope that you will find our app to be a valuable tool for your needs.
            \n \n
            Our app has been designed to be user-friendly and intuitive, with a range of features and functions.
            \n \n
            Thank you again for choosing API ACE and we hope you enjoy using our app!
            \n \n
            Best regards,
            API ACE`
            sendMail(sub, body, email)

            const userData = await userModel.find({ email })

            const token = jwt.sign({ "id": userData[0]._id }, "normal", { expiresIn: '24h' })
            await client.set('token', token, { EX: 86400 })

            return cb(null, user);
        }
    }
));

module.exports = { passport }