# PostgreSql Query Tool  v1.1 #

### Install and Config ##
Markup :
 1.cd server 
 2.in terminal window write "npm install"
 3.configure the db.js to connect to your sql server and database by changing the user,password and database. Configuration of port and host maybe needed 
 4. in terminal window write "nodemon" to start server 
 5. Server running when server message says "server has started on port 5000"

 ### Restart Server  ##
 Markup :
  command + S (mac)
 Control + S (window)

 ### HTTP request  ##

 ### insert-data  ###
  http request=http://localhost:5000/sql/insert-data
  query="sql query to what tables to insert values"
 values=data values to be inserted. Multiple value seperate using ,
 quantity= how many times to insert 

 ### insert-data array ###
  http request=http://localhost:5000/sql/insert-data
  value parameters uses array to insert multiple different values within that array
 query="sql query to what tables to insert values"
 value []=data values to be inserted. Multiple different values seperate using , in the array
 quantity= how many times to insert (this is ignore when using array)

 ### delete table  ###
 http request=http://localhost:5000/sql/delete-tables/:tablenames
 tablenames are the parameters of what tables you want to delete.
 To Delete multiple table you can e.g table1,table2

  ### delete table  ###
 http request=http://localhost:5000/sql/delete-tables-all
 Delete all tables by deleting scheme and making a new 1