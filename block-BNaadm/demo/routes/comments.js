let express=require("express");
let router=express.Router();
let Comment=require("../models/CommentSchhema");

router.get('/:id/edit',(req,res,next)=>{
    let id = req.params.id;
    Comment.findById(id,(err,comments)=>{
        console.log(err,comments)
        res.render("updateComments",{comments})
    })
})

router.post("/:id/edit",(req,res,next)=>{
    let id=req.params.id;
    Comment.findByIdAndUpdate(id,req.body,(err,comments)=>{
        if(err) return next(err);
        res.redirect("/blog/" + comments.blogId);
    })
})
// delete comments 
router.get("/:id/delete",(req,res,next)=>{
    let id=req.params.id;
    Comment.findByIdAndDelete(id,(err,comments)=>{
        res.redirect("/blog/" + comments.blogId);   
    })
})


// increase the likes

router.get("/:id/likes",(req,res,next)=>{
    let id=req.params.id;
   Comment.findByIdAndUpdate(id,{$inc:{likes:1}},(err,comments)=>{
    if(err) return next(err);
    res.redirect("/blog/" + comments.blogId); 
   }) 
})





module.exports= router;