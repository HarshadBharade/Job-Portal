import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title:{
    type: String,
    requried: true
  },
  description:{
    type: String,
    requried: true
  },
  requirments:[{
    type: String,
  }],
  salary:{
    type: Number,
    requried: true
  },
  location:{
    type: String,
    requried: true
  },
 jobType:{
    type: String,
    requried: true
  },
  position:{
    type: Number,
    requried: true
  },
  company:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Company',
    required: true
  },
  created_by:{
   type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required: true
  },
  applications:
  [
  {
    type:mongoose.Schema.Types.ObjectId,
    ref:'Application',
  }
  ]
},{timestamps:true});

export const Job = mongoose.model("Job" , jobSchema);