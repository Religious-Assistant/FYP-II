//this file makes it easy to access all .env file variables

module.exports={
    port:process.env.PORT || 8888,
    database_url:process.env.DATABASE_URL,
    jwt_secret:process.env.JWT_KEY,
}