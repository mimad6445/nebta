const expressJwt = require('express-jwt')

const func_spec = function expressJwt() {
    const secret = process.env.secret;
    return expressJwt({ secret, algorithms: ['HS256'], isRevoked: isRevoked })
    .unless({
        path: [
            '/api/auth/login',
            
        ]
    });
}


async function isRevoked(req, payload, done) {
    if (!payload.isAdmin) {
        done(null, true)
    }
    done();
}

module.exports = func_spec