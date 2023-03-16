` guidline:
username
        string
        unique
        required Trimmed

email
        string
        required
        unique
        must match a valid email adress (look into mongooses matching validation)


thoughts
        array of _id alues refrencing the thought model
        
friends
        array of _id values referencing the user model (self reference)        

`
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
        username:{
                type: String,
                required: true,
                trim: true,
                minlength:1,
                maxlength: 50,


        },
        email:{
                type: String,
                required: true, 
                unique: true,      
                validate: {
                        validator: function(v) {
                          // regular expression to validate email format
                          return /\S+@\S+\.\S+/.test(v);
                        },
                        message: props => `${props.value} is not a valid email address!`
                      } 


        },

        thoughts:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Thought'


        },
        friends:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'


        },
        subscribeDate:{
                type: Date,
                required: true,
                default: Date.now
        }

})

//export the schema
module.exports = mongoose.module('user', userSchema)