const express = require("express");
const router = express.Router();
const sesController = require ('../../controllers/sesController');
const authController = require ('../../controllers/authController')
router.get('/index' ,(req,res)=>{
   res.render('index')
})

router.get('/', (req,res)=>{
   res.render('Login',{alert: false})
})

router.get('/login', (req,res)=>{
   res.render('Login',{alert: false})
})

router.get('/menu',authController.isAuthenticated, (req,res)=>{
   res.render('Menu',{user:req.user})
})

//router.get('/menu', (req,res)=>{
  // res.render('Menu')
//})

//router para los metodos controller:
router.post('/login',authController.login)
router.get('/logout',authController.logout)
module.exports= router;

   