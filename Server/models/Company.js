const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')
const bcrypt = require('bcrypt');

const CompanySchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    company_name: {
        type: String,
        required: true,
        trim: true
    },
    representative: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    package: {
        type: String,
        required: true,
        trim: true
    },
})

CompanySchema.plugin(timestamp)

//This is called a pre-hook, before the user information is saved in the database
//this function will be called, we'll get the plain text password, hash it and store it.
CompanySchema.pre('save', async function(next){
    //Hash the password with a salt round of 10, the higher the rounds the more secure, but the slower
    //your application becomes.
    const hash = await bcrypt.hash(this.password, 10);
    //Replace the plain text password with the hash and then store it
    this.password = hash;
    //Indicates we're done and moves on to the next middleware
    next();
  });
  
  //We'll use this later on to make sure that the user trying to log in has the correct credentials
  CompanySchema.methods.isValidPassword = async function(password){
    const company = this;
    //Hashes the password sent by the user for login and checks if the hashed password stored in the 
    //database matches the one sent. Returns true if it does else false.
    const compare = await bcrypt.compare(password, company.password);
    return compare;
  }


const Company = mongoose.model('Company', CompanySchema)
module.exports = Company