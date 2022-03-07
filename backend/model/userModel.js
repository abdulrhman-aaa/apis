const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'plase add a name']

    },
    email: {
        type: String,
        required: [true, 'plase add an email']
        
    },
    password: {
        type: String,
        required: [true, 'plase add a passwoed']
    },
    
},
{
    timestamps: true
})

module.exports= mongoose.model('user', userSchema)