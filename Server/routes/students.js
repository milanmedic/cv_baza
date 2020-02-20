const Student = require('../models/Student')
const uuid = require('uuid/v4')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')
const config = require('./../config')
const passport = require('passport')

const sendMail = async(student, welcomeText, welcomeHTML, message_subject = `Konteh CV Database User Profile Credentials`) => {
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
        to: student.email, // list of receivers
        subject: `${message_subject}`, // Subject line
        text: `${welcomeText}`, // plain text body
        html: `${welcomeHTML}` // html body
    }

    let info = undefined
    // send mail with defined transport object
    info = await transporter
        .sendMail(mailOptions)
        .catch(err => {
            console.log(err)
        })
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        /*
        Files will be saved in the 'uploads' directory. Make
        sure this directory already exists!
      */
        cb(null, path.join(__dirname, '../uploads/'));
    },
    filename: (req, file, cb) => {

        const newFilename = `${req
            .body
            .index}${path
            .extname(file.originalname)}`
        cb(null, newFilename);
    }
});

const upload = multer({storage});

module.exports = app => {
    app.post('/add_student', upload.single('student_cv'), async(req, res, next) => {

        const student = new Student({
            _id: req.body.index,
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
            faculty: req.body.faculty,
            course: req.body.course,
            year: req.body.year,
            work: req.body.work,
            internship: req.body.internship,
            pdf_path: `${path.join(__dirname, '../uploads/')}${req.body.index}.pdf`
        })

        try {
            const newStudent = await Student.create(student)
            const text = `Thank you for leaving your CV onto our Konteh CV Database. We wish you all the best in finding your dream company! You can find your login credentials in this email:\n USER: ${student.email}\nPASS: ${student.password}`
            const textHtml = `<p>Thank you for leaving your CV onto our Konteh CV Database. We wish you all the best in finding your dream company! You can find your login credentials in this email:</p>
            <b>USERNAME:</b> ${student.email}<br /><b>PASSWORD:</b> ${student.password}<br/>
            <p><b>Link to login site:<b/>`
            sendMail(student, text, textHtml)
            res.send({exists: false})
            return next()
        } catch (err) {
            console.log(`Failed to create user. More info here: ${err}`)
            res.send({exists: true})
            return next()
        }
    })

    app.options('/upload_new_cv/:id', cors())
    app.patch('/upload_new_cv/:id', upload.single('student_cv'), async(req, res, next) => {
        try {
            let student = await Student.findByIdAndUpdate(req.body.index, {
                pdf_path: `${path.join(__dirname, '../uploads/')}${req.body.index}.pdf`
            })
            student = await Student.findById(req.params.id)
            student.password = undefined
            res.send(student)
        } catch (err) {
            console.log(err)
            return next()
        }
    })

    app.get('/download_cv/:index', async(req, res, next) => {

        try {
            if(fs.existsSync(`${path.join(__dirname, '../uploads/')}${req.params.index}.pdf`)){
                let file = await fs.createReadStream(`${path.join(__dirname, '../uploads/')}${req.params.index}.pdf`)
                await file.pipe(res)
            }
        } catch (err) {
            console.log(err)
            next()
        }
    })

    app.get('/students', passport.authenticate('jwt', { session : false }), async(req, res, next) => {
        try {
            const students = await Student.find({})
            let newStudents = students.map( (item) => {
                item.password = undefined
                return item
            })
            res.send(newStudents)
            return next()
        } catch (err) {
            console.log(`There was an error while retreiving students. More on the error here: ${err}`)
            return next()
        }
    })

    app.get('/student/:index', async(req, res, next) => {
        try {
            const student = await Student.findById(req.params.index)
            student.password = undefined
            res.send(student)
            return next()
        } catch (err) {
            console.log(`There was an error while retreiving the student. More on the error here: ${err}`)
            return next()
        }
    })
    app.options('/delete_student/:id', cors())
    app.delete('/delete_student/:id', async(req, res, next) => {
        try {
            const student = await Student.findByIdAndDelete(req.params.id)
            let file = fs.unlink(`${path.join(__dirname, '../uploads/')}${req.params.id}.pdf`, (err) => {
                if(err) {
                    console.log(err)
                } 
                console.log(`File ${req.params.id} deleted`)
            })
            res.sendStatus(204)
        } catch (err) {
            console.log(`Unable to find and delete document.\nMore info: ${err}`)
            return next()
        }
    })

    app.options('/change_year/:id', cors())
    app.patch('/change_year/:id', async(req, res, next) => {
        try {
            let student = await Student.findByIdAndUpdate(req.params.id, {
                year: req.body.newYear
            })
            student = await Student.findById(req.params.id)
            student.password = undefined
            res.send(student)
        } catch (err) {
            console.log(err)
            return next()
        }
    })

    app.options('/change_phone/:id', cors())
    app.patch('/change_phone/:id', async(req, res, next) => {
        try {
            let student = await Student.findByIdAndUpdate(req.params.id, {
                phone: req.body.newPhone
            })
            student = await Student.findById(req.params.id)
            student.password = undefined
            res.send(student)
        } catch (err) {
            console.log(err)
            return next()
        }
    })

    app.options('/change_email/:id', cors())
    app.patch('/change_email/:id', async(req, res, next) => {
        try {
            let student = await Student.findByIdAndUpdate(req.params.id, {
                email: req.body.newEmail
            })
            student = await Student.findById(req.params.id)
            const text = `You have changed your email credential. You can find your new login credentials in this email:\n USER: ${student.email}\nPASS: ${student.password}`
            const textHtml = `<p>You have changed your email credential. You can find your new login credentials in this email:</p>
            <b>USERNAME:</b> ${student.email}<br /><b>PASSWORD:</b> ${student.password}<br/>
            <p><b>Link to login site:<b/>`
            sendMail(student, text, textHtml)
            student.password = undefined
            res.send(student)
        } catch (err) {
            console.log(err)
            return next()
        }
    })

    // WORK IN PROGRESS
    app.options('/change_password/:id', cors())
    app.patch('/change_password/:id', async(req, res, next) => {
        try {
            let student = await Student.findByIdAndUpdate(req.params.id, {
                password: req.body.newPassword
            })
            student = await Student.findById(req.params.id)
            student.password = undefined
            res.send(student)
        } catch (err) {
            console.log(err)
            return next()
        }
    })

    app.get('/delete_account/:id', (req, res, next) => {
        const student = {
            email: config.ADMIN_MAIL
        }
        const text = `Hello, I would like to delete my accout.\n My index number is: ${req.params.id}`
        const textHtml = `<p>Hello, I would like to delete my accout.\n My index number is: <b>${req.params.id}</b></p>`
        const message_subject = `Konteh CV Database Delete Profile Request`
        sendMail(student, text, textHtml, message_subject)
        res.send('request sent')
    })
}