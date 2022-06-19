var express = require('express');
var router = express.Router();
let path = require('path');

let multer = require('multer');
let uploadPath=path.join(__dirname, "../" ,  "public/images")
let Book = require('../models/Book');

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,uploadPath );
  },

  filename: (req, file, cb) => {
    console.log(file)
    cb(null, Date.now() + '-' + file.originalname);
  },
});

let upload = multer({ storage: storage });

/* GET books listing. */
router.get('/', (req, res, next) => {
  Book.find({}, (err, book) => {
    if (err) return next(err);
    res.render('title', { book });
  });
});

// form render page
router.get('/new', (req, res, next) => {
  res.render('form');
}); 

// capture the data  

router.post("/new",upload.single("cover_image",),(req,res,next)=>{
  req.body.cover_image=req.file.filename;
  Book.create(req.body,(err,book)=>{
res.redirect("/books")
  })
})


router.get("/:id/details",(req,res,next)=>{
  let id= req.params.id;
  Book.findById(id,(err,book)=>{
    if(err) return next(err);
    res.render("details",{book})
  })
})

// edit book

router.get("/:id/edit",(req,res,next)=>{
  let id=req.params.id;
  Book.findById(id,(err,book)=>{
    res.render("update",{book})
  })
})

router.post("/:id/edit",(req,res,next)=>{
  let id=req.params.id;
  Book.findByIdAndUpdate(id ,req.body ,(err,book)=>{
    console.log(err,book)
    if (err) return next(err);
    res.redirect("/books/"+id+"/details")
  })
})

router.get("/:id/delete",(req,res,next)=>{
  let id=req.params.id;
Book.findByIdAndDelete(id,(err,book)=>{
  if(err) return next(err);
  res.redirect("/books")
})
})





module.exports = router;
