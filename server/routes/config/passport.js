// const passportJWT = require("passport-jwt");
// const User = require("../model/User");
// const JwtStrategy = passportJWT.Strategy;
// const ExtractJwt = passportJWT.ExtractJwt;

// const JWT_SECRET = process.env.JWT_SECRET;

// const opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = JWT_SECRET;

// module.exports = (passport) => {
//   passport.use(
//     new JwtStrategy(opts, async function (jwt_payload, done) {
//       try {
//         // const user = await User.findOne({ id: jwt_payload.sub });
//         // console.log(jwt_payload.sub);
//         const user = await User.findById(jwt_payload._id);
//         // console.log("User is", user);
//         if (user) {
//           return done(null, user);
//         } else {
//           return done(null, false);
//         }
//       } catch (err) {
//         return done(err, false);
//       }
//     })
//   );
// };

const passportJWT = require("passport-jwt");
const User = require("../model/User");
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const JWT_SECRET = "jwt secret string";

let opts = {};

// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = JWT_SECRET;

// module.exports = (passport) => {
//   passport.use(
//     new JwtStrategy(opts, function (jwt_payload, done) {
//       User.findOne({ id: jwt_payload.sub })
//         .then((user) => {
//           if (user) {
//             return done(null, user);
//           } else {
//             return done(null, false);
//           }
//         })
//         .catch((err) => done(err, false));
//     })
//   );
// };
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = JWT_SECRET;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      // console.log("jwt_payload:", jwt_payload); // print the JWT payload
      User.findOne({ _id: jwt_payload.userId }) // use "_id" instead of "id"
        .then((user) => {
          // console.log("user:", user); // print the retrieved user
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        })
        .catch((err) => done(err, false));
    })
  );
};
