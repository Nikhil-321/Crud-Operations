const router = require('express').Router()
const User = require('../models/user')
const multer = require('multer')
const path = require('path')


const uploadPath = path.join('public' , User.imageBasePath)





// Multer Config

const imageMimeTypes = ['image/jpeg' , 'image/png' , 'images/gif']


const upload= multer({

    dest : uploadPath,
    fileFilter : (req ,file, callback)=>{
        callback(null , imageMimeTypes.includes(file.mimetype))
    }
})



// Home Route :  just a message nothing else
router.get('/' , (req,res) =>{
    res.send('You are at Home Route endpoints : /new , /list')
})

// New Route : Form Display
router.get('/new' , (req,res) =>{
    res.render('new' , {user  :new User()})
})

// list Route : Listing All the names and other fields
router.get('/list' , async (req,res) =>{
    const users = await User.find({})
    res.render('index' , {users : users})
})

// Editing Form
router.get('/edit/:id' , async (req,res) =>{
    const user = await User.findById(req.params.id)
    res.render('edit' , {user : user})
})



// Creating New user

router.post('/user' , upload.single('image') , async (req,res) =>{

    const fileName = req.file != null ? req.file.filename : null
    const user = new User({
        firstName : req.body.firstName,
        lastName  : req.body.lastName,
        email : req.body.email,
        contact : req.body.contact,
        imageName : fileName
    })
        try{
        
           const newUser = await user.save();
            return res.redirect('/list')

  } catch(err){
      res.redirect('/' , {user  :new User()})
  }
    

        
})

// Edit Route : Editing of stored fields

router.put('/edit/:id' , async (req , res) =>{
    const user = await User.findByIdAndUpdate({_id : req.params.id} , req.body , (err , article) =>{
        if(err){
            res.redirect('/')
        }
        return res.redirect('/list')
    })
})


module.exports = router