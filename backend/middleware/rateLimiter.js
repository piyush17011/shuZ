const rateLimit = require('express-rate-limit')

const generalLimiter = rateLimit({
    windowMs : 15*60*1000,             //1 sec = 1000ms
    max : 100,
    message : { error:"You cannot access these resources,try again after 15 minutes" }

})

const authLimiter = rateLimit({
    windowMs : 60*60*1000,             //1 sec = 1000ms
    max : 5,
    message : { error:"You cannot login max 5 attempts,try again after 60 minutes" }

})

module.exports = {generalLimiter,authLimiter}