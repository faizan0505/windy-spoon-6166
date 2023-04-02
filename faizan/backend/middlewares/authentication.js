const jwt= require("jsonwebtoken")
require("dotenv").config()

// {
//     url: process.env.redis
// }

const { createClient } = require("redis")
const client = createClient({
    url: process.env.redis
});
client.on('error',err => console.log('Redis Client Error',err));
client.connect();

const authentication =async (req, response, next) => {
    const token =await client.get('token')
    // const token = req.headers.authorization;

    try{
        if(token){
            const expToken = await client.lRange('BlackListed', 0, -1)

            if(expToken.includes(token)){
                response.status(401).send({
                    "message": "Please Log-In first - Blacklisted token"
                })
            }else{
                const decoded =jwt.verify(token, "normal");
                if(decoded){
                    req.body.userID= decoded.id;
                    next()
                } else{
                    response.status(401).send({
                        "message":"Please Log-In first - Session expired"
                    })
                }
            }
        }else {
            response.status(401).send({
                "message":"Please Log-In first"
            })
        }
    }catch(error){
        console.log(error)
        response.status(401).send({
            "message": "Please Log-In First",
            error
        })
    }
}

module.exports = {authentication}