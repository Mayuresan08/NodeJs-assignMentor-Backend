const router=require("express").Router()

const mongo=require("../shared/mongo.js")

const{ObjectId} = require("mongodb")

const {studentSchema} =require("../shared/schema")


//list students
router.get("/",async (req,res)=>{
    let data= await mongo.students.find().toArray()
    console.log(data)
    res.send(data)
})

//create new student
router.post("/",async(req,res)=>{
const {value,error}= studentSchema.validate(req.body)
if(error) return res.status(400).send({Error:error.details[0].message})
let data;
if(value.mentorId === "unassigned")  
{ data =await mongo.students.insert(value)
}
else {
    data =await mongo.students.insert({...value,mentorId:ObjectId(value.mentorId)})
}
res.send(value)
})

//assign mentor to multiple students
router.put("/assignMentor",async(req,res)=>{
    console.log("in assignMentor")

    let data=await mongo.students.updateMany({name:{$in:req.body.names}},{$set:{mentorId:ObjectId(req.body.mentorId)}})
    res.status(201).send("updated")
})

//change mentor for a particular student
router.put("/:_id",async(req,res)=>{
    let id=req.params._id
   console.log(id,req.body) 
   let data=await mongo.students.findOneAndUpdate({_id:ObjectId(id)},
                                            {$set:{mentorId:ObjectId(req.body.mentorId)}},
                                            {returnNewDocument:true})
    res.send(data)
})

//show all students for a particular mentor
router.get("/getMentor/:mentorId",async(req,res)=>{
    let id=req.params.mentorId
    console.log(id)
    let data= await mongo.students.find({mentorId:ObjectId(id)}).toArray()
    res.send(data)
})


module.exports=router