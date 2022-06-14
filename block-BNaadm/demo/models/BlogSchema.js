let mongoose=require("mongoose");
let Schema=mongoose.Schema;

let BlogSchema=new Schema({
    title:{type:String,required:true},
    description:String,
    author:String,
    tags:[String],
    likes:{type:Number,default:0},
    dislikes:{type:Number,default:0}
},{timestamps:true})

module.exports=mongoose.model("Blog",BlogSchema);