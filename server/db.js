const Pool=require("pg").Pool;
// configuration file to connec to database
const pool=new Pool(
    {
        user:"postgres",
        password:"123",
        host:"localhost",
        port:5432,
        database:"sql"
    }
);


module.exports=pool;
