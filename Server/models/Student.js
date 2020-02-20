const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')

const StudentSchema = new mongoose.Schema({
    _id:{
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    surname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    faculty: {
        type: String,
        required: true,
        trim: true,
    },
    course: {
        type: String,
        required: true,
        trim: true,
    },
    year: {
        type: Number,
        required: true,
    },
    work: {
        type: Boolean,
        required: true,
    },
    internship: {
        type: Boolean,
        required: true,
    },
    pdf_path: {
        type: String,
        required: true
    }
})

StudentSchema.plugin(timestamp)

const Student = mongoose.model('Student', StudentSchema)
module.exports = Student