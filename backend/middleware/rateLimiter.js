const rateLimit = require('express-rate-limit')

const generalLimiter = rateLimit({
    windowMs : 15*60*1000,             //1 sec = 1000ms
    max : 100,
    message : { error:"You cannot access these resources,try again after 15 minutes" }

})

const authLimiter = rateLimit({
    windowMs : 60*60*1000,             // 1 hour
    max : 5,
    standardHeaders: true,             // Return rate limit info in `RateLimit-*` headers
    legacyHeaders: false,              // Disable `X-RateLimit-*` headers
    handler: (req, res) => {
        const remaining = req.rateLimit.remaining;
        const resetTime = new Date(req.rateLimit.resetTime).toLocaleTimeString();
        res.status(429).json({
            error: `Too many login attempts. You have ${remaining} attempts remaining. Try again after ${resetTime}`,
            remaining: remaining,
            resetTime: req.rateLimit.resetTime
        });
    }
})

module.exports = {generalLimiter,authLimiter}