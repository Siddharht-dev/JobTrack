const mongoose = require("mongoose");

const jobSchema =  new mongoose.Schema({
    company:{
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    salary:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    }
});

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;