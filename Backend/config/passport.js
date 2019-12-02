'use strict';
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

// Setup work and export for the JWT passport strategy
module.exports = function (passport) {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: "secret",
    };
    passport.use(new JwtStrategy(opts, function (jwt_payload, callback) {
         console.log("===========call inside passport middleware");
         callback(null,jwt_payload);
    }));
};
