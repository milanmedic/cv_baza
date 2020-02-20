module.exports = {
    ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3001,
    URL: process.env.BASE_URL || `http://localhost:3001`,
    MONGODB_URI: process.env.MONGODB_URI || `mongodb+srv://nikola:nikola@cvbaza-1pazl.mongodb.net/test?retryWrites=true`,
    MAIL_USR: 'no-reply@konteh.org',
    MAIL_PASS: `M0j@5iMu5k@lutk@`,
    ADMIN_MAIL: `it@eestecns.org`,
    JWT_SECRET: 'eypZAZy0CY^g9%KreypZAZy0CY^g9%Kr'
}