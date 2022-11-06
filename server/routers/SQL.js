const express = require("express");
const router = express.Router();
const pool = require("../db");
const SQLUtil=require("../Base/SQLUtil");
const sqlUtil=new SQLUtil();
// add data into table 
router.post("/insert-data", async (req, res) => {
    var {query,values,quantity}=req.body;
    var sql="";
    if(query==""&&values==""&&quantity==""){
        return res.status(500).send("Enter all these paramaters");
    }
    // validation 
    if(quantity<=0||quantity==""&&Array.isArray(values)==faslse){
        return res.status(500).send("Enter value bigger than 0");
     }
     if(sqlUtil.checkToString(query,"insert")){
        return res.status(500).send("INSERT query allowed");
     }
     const para = query.slice(
        query.indexOf('(') + 1,
        query.lastIndexOf(')'),
      );
      const paraArr=para.split(",");
        // Set VALUES para
      var valueIn="";
      var count=1;
      for(var p in paraArr){
        if(valueIn==""){
            valueIn="$"+count;
        }else{
            valueIn=valueIn+","+"$"+count;
        }
        count++;
      }
    if(Array.isArray(values)==false){
        var valueAr=values.split(",");
        valueAr=returnDate(valueAr);
    }
    var sqlOut=[];
    try{
        const queryIn=query+" VALUES("+valueIn+")  RETURNING * ";
        // entered values is array
        if(Array.isArray(values)==true){
            for(var i=0; i<values.length; i++){
                var input=values[i].split(",");
                input=returnDate(input);
                sql=await pool.query(
                    queryIn,
                    input
                    );
                sqlOut.push(sql);
            }
            quantity=values.length;
        }else{
            for(var i=0; i<quantity; i++){
                sql=await pool.query(
                queryIn,
                valueAr
                );
            }
            sqlOut.push(sql);
        }
        const status={
            "quantity":quantity,
            "sql":sqlOut
        };
        res.json(status);
    }catch(err){
        // Error occured
        res.status(500).send(err.message);
    }
    // fill in datetimestamp this Date
    function returnDate(value){
        for(var v in value){
            if(value[v].toLowerCase()=="current_timestamp"){
                value[v]=new Date();
            }
        }
        return value
    }
});

router.get("/get-data",async(req,res)=>{
    const {query}=req.body;
    if(sqlUtil.checkToString(query,"select")){
        return res.status(500).send("SELECT query allowed");
     }
    try{
        const sql=await pool.query(
            query
        );
        res.json(sql)
    }catch(err){
        res.status(500).send(err.message);
    }
});
// Delete table route 
router.delete("/delete-tables/:tablenames",async(req,res)=>{
    var {tablenames}=req.params;
    if(tablenames==""){
        return res.status(500).send("enter table name");
    }
    const query="DROP TABLE "+tablenames;
    try{
        const sql=await pool.query(
        query
        );
        res.json(sql)
    }catch(err){
        res.status(500).send(err.message);
    }
});
// Delete all table route 
router.delete("/delete-tables-all",async(req,res)=>{
    const findTables="SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' and table_type='BASE TABLE';";
    var arr=[];
    try{
        const sqlFind=await pool.query(
        findTables
        );
        for(var i=0; i<sqlFind.rows.length; i++){
            arr.push(sqlFind.rows[i].table_name);
        }
        // delete tables
        const query="DROP TABLE "+arr.toString();
        try{
            const sql=await pool.query(
            query
            );
            res.json(sql)
        }catch(errD){
            res.status(500).send(errD.message);
        }
    
    }catch(err){
        res.status(500).send(err.message);
    }
});
module.exports = router;