var passport = require('passport');
const Company = require('../models/Company');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var LocalStrategy = require('passport-local').Strategy;
const config = require('../config')

var localOptions = {
    usernameField: 'email',
    passwordField : 'password',
    passReqToCallback: true
};

var localSignupCompany = new LocalStrategy(localOptions, async (req, email, password, done) => {
        try {
            //Save the information provided by the user to the the database
            const { _id, company_name, representative, phone, package } = req.body;
            const company = await Company.create({ _id, email, password, company_name, representative, phone, package });
            //Send the user information to the next middleware
            return done(null, company);
        } 
        catch (error) {
            done(error);
        }
});

passport.use('signupCompany', localSignupCompany);

//Create a passport middleware to handle User login
passport.use('loginCompany', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password'
  }, async (email, password, done) => {
    try {
      //Find the user associated with the email provided by the user
      const company = await Company.findOne({ email });
      if( !company ){
        //If the user isn't found in the database, return a message
        return done(null, false, { message : 'Company not found'});
      }
      //Validate password and make sure it matches with the corresponding hash stored in the database
      //If the passwords match, it returns a value of true.
      const validate = await company.isValidPassword(password);
      if( !validate ){
        return done(null, false, { message : 'Wrong Password'});
      }
      //Send the user information to the next middleware
      return done(null, company, { message : 'Logged in Successfully'});
    } catch (error) {
      return done(error);
    }
  }));

  passport.use(new JwtStrategy({
    //secret we used to sign our JWT
    secretOrKey : config.JWT_SECRET,
    //we expect the user to send the token as a query paramater with the name 'secret_token'
    jwtFromRequest : ExtractJwt.fromBodyField('token')
  }, async (token, done) => {
    try {
      //Pass the user details to the next middleware
      return done(null, token);
    } catch (error) {
      done(error);
    }
  }));