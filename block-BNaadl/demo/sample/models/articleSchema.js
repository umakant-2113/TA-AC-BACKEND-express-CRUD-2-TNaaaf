let mongoose=require("mongoose");
let Schema=mongoose.Schema;

let articleSchema=new Schema({
    title:{type:String,required:true},
    description:String,
    tags:[String],
    author:{type:String,required:true},
    likes:{type:Number,default:0},
    dislikes:{type:Number,default:0}
})

module.exports=mongoose.model("Article",articleSchema)