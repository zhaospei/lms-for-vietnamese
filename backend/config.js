
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

module.exports = {
    port: process.env.PORT,
    auth: {
        jwtSecret: process.env.JWT_SECRET,
    },
    mysql: {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER, 
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE
    },
    // email: {
    //   host: process.env.EMAIL_HOST,
    //   port: process.env.EMAIL_PORT,
    //   from: process.env.EMAIL_FROM,
    //   service: process.env.EMAIL_SERVICE,
    //   username: process.env.EMAIL_USERNAME,
    //   password: process.env.EMAIL_PASSWORD,
    // },
    cloudinary: {
      key: process.env.CLOUDINARY_KEY,
      secret: process.env.CLOUDINARY_SECRET,
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    }
}
