const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport")
const { v4: uuidv4 } = require('uuid');
const { userModel } = require("../models/user_model.js")
const jwt = require("jsonwebtoken")

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

            const token = jwt.sign({ "id": userData[0]._id }, "normal", { expiresIn: '24h' })
            await client.set('token', token, { EX: 86400 })
            return cb(null,userData)
        } else {
            const user = await new userModel({
                username,
                email,
                password: uuidv4(),
                // photo
            })
            await user.save()

            const userData = await userModel.find({ email })
            
            const token = jwt.sign({ "id": userData[0]._id }, "normal", { expiresIn: '24h' })
            await client.set('token', token, { EX: 86400 })

            return cb(null, user);
        }
    }
));

module.exports = { passport }