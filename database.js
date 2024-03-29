import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();


const {Pool} = pg;

const database = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:{
        rejectUnauthorized:false
    }
  });


// const database = new Pool({
    
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT,
// });

export default database;