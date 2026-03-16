const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

/* Connect MongoDB */

mongoose.connect("mongodb://127.0.0.1:27017/grievanceDB")

.then(()=>console.log("MongoDB Connected"))

.catch(err=>console.log(err))

/* Complaint Model */

const Complaint = mongoose.model("Complaint",{

complaint_id:String,
title:String,
description:String,
category:String,
location:String,
status:{
type:String,
default:"Submitted"
}

})

/* Submit Complaint API */

app.post("/api/complaints/submit", async(req,res)=>{

try{

const id = "CMP" + Math.floor(Math.random()*100000)

const complaint = new Complaint({

complaint_id:id,
title:req.body.title,
description:req.body.description,
category:req.body.category,
location:req.body.location

})

await complaint.save()

res.json({
message:"Complaint submitted successfully",
id:id
})

}catch(err){

res.status(500).json({error:"Server Error"})

}

})

/* Get all complaints (for admin dashboard) */

app.get("/api/complaints", async(req,res)=>{

const complaints = await Complaint.find()

res.json(complaints)

})

/* Start Server */

app.listen(5000,()=>{

console.log("Server running on port 5000")

})