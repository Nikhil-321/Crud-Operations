const mongoose = require('mongoose')
const path = require('path')

const imageBasePath = 'uploads/images'

const Schema = mongoose.Schema

const userSchema = new Schema({
    
    firstName : {type : String , required : true},
    lastName : {type : String , required : true},
    email : {type : String , required : true , unique: true},
    contact : {type : Number , required : true},
    imageName : {type : String }

    

} , {timestamps : true})

userSchema.virtual('imagePath').get(function(){
    if(this.imageName != null){
        return path.join('/' , imageBasePath , this.imageName)
    }
})



module.exports = mongoose.model('User' , userSchema)
module.exports.imageBasePath = imageBasePath

