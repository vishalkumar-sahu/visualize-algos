const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const users_schema = new mongoose.Schema({
    // user_id: {
    //     type : String,
    //     unique : true,
    // },
    name: {
        type : String,
        required : true,
    },
    username: {
        type : String,
        required : true,
        unique : true,
    },
    // phone: {
    //     type : Number,
    //     required : true,
    //     unique: true
    // },
    email: {
        type : String,
        required : true,
        unique: true
    },
    password: {
        type : String,
        required : true
    }
    
})

mongoose.model("Users", users_schema)
