var express = require('express');
var router = express.Router();

let Blog=require("../models/BlogSchema")
let Comment=require("../models/CommentSchhema")

/* GET users listing. */
router.get('/', (req, res, next) =>{
  res.render("blog")
});

router.get("/new",(req,res,next)=>{
  res.render("blogForm")
})

router.post("/new",(req,res,next)=>{
  Blog.create(req.body,(err,blog)=>{
    if(err) return next(err)
    console.log(blog)
    res.render("blogtitle",{blog})
  })
})

router.get("/alltitle",(req,res,next)=>{
Blog.find({},(err,blog)=>{
  if(err)return next(err);
  res.render("alltitle",{blog})
})
})


router.get("/:id",(req,res,next)=>{
  let id=req.params.id;
  Blog.findById(id,(err,blog)=>{
    if(err) return next(err)
    Comment.find({blogId:id},(err,comments)=>{
      res.render("blogDetails",{blog,comments})
    })
  })
})

// increase likes 

router.get("/:id/likes",(req,res,next)=>{
  let id=req.params.id;
  Blog.findByIdAndUpdate(id,{$inc:{likes:+1}},(err,blog)=>{
    if(err) return next(err)
  res.redirect("/blog/"+id)
  })
});

// dislikes decrease
router.get("/:id/dislikes",async(req,res,next)=>{
  let id=req.params.id;
  let blog = await Blog.findById(id);
   if(blog.likes >0){
    Blog.findByIdAndUpdate(id,{$inc :{likes:-1}},(err,blog)=>{
      if(err) return next(err)
      res.redirect("/blog/"+id)
    })
   }else{
    res.redirect("/blog/"+id)
   }
 
})

// update the value 
router.get("/:id/edit",(req,res,next)=>{
  let id=req.params.id;
  Blog.findById(id,(err,blog)=>{
    if(err) return next(err)
    res.render("updateForm",{blog})
  })
})

// updata data 

router.post("/:id/edit",(req,res,next)=>{
  let id=req.params.id;
  Blog.findByIdAndUpdate(id,req.body,(err,blog)=>{
    if(err) return next(err);
    res.redirect("/blog/"+id);
  })
})

// delete data 
router.get("/:id/delete",(req,res,next)=>{
  let id=req.params.id;
  Blog.findByIdAndDelete(id,(err,blog)=>{
    if(err) return next(err)
    res.redirect("/blog/alltitle")
  })
})

// comment add update detele 

router.post("/:id/",(req,res,next)=>{
  let id=req.params.id;
  req.body.blogId=id;
// console.log(req.body)
  Comment.create(req.body,(err,blog)=>{
    // console.log(blog,err)
    if(err)return next(err)
    res.redirect("/blog/"+id)
  })
})







module.exports = router;
