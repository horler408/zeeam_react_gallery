const jwt = require('jsonwebtoken');

module.exports = jwt({
    secret: process.env.JWT_SECRET,
    issuer: 'api.orbit',
    audience: 'api.orbit'
})
