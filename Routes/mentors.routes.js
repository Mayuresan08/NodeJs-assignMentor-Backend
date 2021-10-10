const router=require("express").Router()

const mongo=require("../shared/mongo")

const {ObjectId}=require("mongodb")

const schema=require("../shared/schema");
//list mentor
router.get("/",async(req,res)=>{
    let data=await mongo.mentors.find().toArray()
    res.send(data)
})

//create new Mentor
router.post("/",async(req,res)=>{
    console.log("in mentor post",req.body)
    const {value,error}= await schema.mentorSchema.validate(req.body)
console.log(value,error)
    if(error) return res.status(400).send({Error:error.details[0].message})
    data= await mongo.mentors.insert(value)
    console.log(data)
    res.status(200).send(value)
})



module.exports=router