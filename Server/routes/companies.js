const Company = require('../models/Company')
const uuid = require('uuid/v4')
const randomize = require('randomatic')
const cors = require('cors')
const nodemailer = require('nodemailer')
const config = require('./../config')
const passport = require('passport');
const jwt = require('jsonwebtoken');
/*TODO:
    1. Implement password reset (bcrypt for crypting, PASSPORT JS for authentification))
*/

const sendMail = async(company) => {
    // Generate test SMTP service account from ethereal.email create reusable
    // transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com", port: 587, secure: false, // true for 465, false for other ports
        debug: true,
        auth: {
            user: config.MAIL_USR,
            pass: config.MAIL_PASS
        }
    })
    // setup email data with unicode symbols
    let mailOptions = {
        from: config.MAIL_USR, // sender address
        to: company.email, // list of receivers
        subject: "KONTEH CV Database Credentials", // Subject line
        text: `We would like to welcome you to the Konteh Job Fair. You can find your login credentials in this email\n USER: ${company.email}\nPASS: ${company.pass}`, // plain text body
        html: `<p>We would like to welcome you to the Konteh Job Fair. You can find your login credentials in this email</p>
    <b>USERNAME:</b> ${company.email}<br /><b>PASSWORD:</b> ${company.pass}<br/>
    <p><b>Link to login site:<b/>
    ` // html body
    }

    let info = undefined
    // send mail with defined transport object
    info = await transporter
        .sendMail(mailOptions)
        .catch(err => {
            console.log(err)
        })
}

module.exports = app => {
    //GET Companies
    //Only for postman check NOT FOR PRODUCTION
    /*app.get('/companies/:id', async(req, res, next) => { //there is a find by id and delete
        try {
            const company = await Company.findById(req.params.id)
            res.send(company)
            return next()
        } catch (err) {
            console.log(`There was an error while searching for item. Error:/n ${err}`)
            return next()
        }
    })*/
    //delete company
    app.options('/delete_company/:id', cors())
    app.delete('/delete_company/:id', async(req, res, next) => {
        try {
            const company = await Company.findByIdAndDelete(req.params.id)
            res.sendStatus(204)
            return next()
        } catch (err) {
            console.log(`Unable to find and delete document.\nMore info: ${err}`)
            return next()
        }
    })

    app.get('/companies', async(req, res, next) => {
        try {
            const companies = await Company.find({})
            let newCompanies = companies.map( (item) => {
                item.pass = undefined
                return item
            })
            res.send(newCompanies)
            return next()
        } catch (err) {
            console.log(err)
            return next()
        }
    })

    app.post('/add_company', passport.authenticate('signupCompany', { session : false }), async(req, res, next) => {
        // if (!req.is('application/json')) {
        //     console.log(err)
        //     return next()
        // }
        try {
            // const {company_name, representative, email, password, phone, package} = req.body
            // const company = new Company({
            //     _id: uuid(),
            //     company_name,
            //     representative,
            //     email,
            //     password,
            //     phone,
            //     package
            // })
            // //Save the information provided by the user to the the database
            // const newCompany = await Company.create(company);
            // sendMail(company)
            res.set('Access-Control-Allow-Origin', '*');
            res.sendStatus(201) //Created
        } catch (err) {
            console.log(`Failed to create the company. More about the error here: ${err}`)
            return next()
        }
    })

    app.post('/login_company', async (req, res, next) => {
        passport.authenticate('loginCompany', async (err, company, info) => {     
            try {
                if(err || !company){
                const error = new Error('An Error occured')
                    return next(error);
                }
                req.login(company, { session : false }, async (error) => {
                if( error ) return next(error)
                //We don't want to store the sensitive information such as the
                //user password in the token so we pick only the email and id
                const body = { email : company.email, role: 'Company' };
                //Sign the JWT token and populate the payload with the user email and id
                const token = jwt.sign({ company : body }, config.JWT_SECRET);
                //Send back the token to the user
                return res.json({ token });
                });     
            } catch (error) {
                return next(error);
            }
        })(req, res, next);
      });
    app.options('/reset_password/:id', cors())
    app.patch('/reset_password/:id', async(req, res, next) => {
        try {
            const company = await Company.findByIdAndUpdate(req.params.id, {
                pass: setPassword()
            })
            sendMail(company)
            res.sendStatus(200)
        } catch (err) {
            console.log(err)
            return next()
        }
    })
}