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
res.redirect("/")
  })
})


router.get("/details",(req,res,next)=>{
  Book.find({},(err,book)=>{
    if(err) return next(err);
    res.render("details")
  })
})

module.exports = router;
