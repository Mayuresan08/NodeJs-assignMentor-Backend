require("dotenv").config();
const cors=require("cors")
const express = require("express");
const app=express();
const mongo= require("./shared/mongo");
const studentRoutes=require("./Routes/students.routes");
const mentorRoutes=require("./Routes/mentors.routes");


app.use(cors());
(async()=>{

try 
{
   

    await mongo.connect()

    app.use(express.json())

app.use("/students",studentRoutes)

app.use("/mentors",mentorRoutes)

const port = process.env.PORT || 3001

app.listen(port,()=>{
    console.log("server is running on ",port)
})

}
catch(err)
{console.log("ERROR in Connecting to DB",err)}
})();