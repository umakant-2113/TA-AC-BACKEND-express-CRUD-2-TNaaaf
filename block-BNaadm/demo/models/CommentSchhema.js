let mongoose=require("mongoose");

let Schema=mongoose.Schema;

let CommentSchema=new Schema({
   content:{type:String,required:true},
   blogId:{type:Schema.Types.ObjectId, ref:"Blog",required:true},
   likes:{type:Number,default:0} 
},{timestamps:true})

module.exports=mongoose.model("Comment",CommentSchema)