const jwt = require('jsonwebtoken')
const bcrypts = require('bcrypt')
const pool = require('../basedatos/database');
const {promisify} = require('util')
require('dotenv').config();

//metodo para login 
exports.login = async(req,res) =>{
  try{
    const email= req.body.email
    const pass= req.body.contraseña

    if(!email || !pass){
      res.render('login',{
         alert:true,
         alertTitle: "Advertencia",
         alertMessage: "Ingrese un mail y password",
         alertIcon:'info',
         showConfirmButton: true,
         timer: false,
         ruta: 'login'
      })
    }else{
      const [rows, fields] = await pool.execute('SELECT * FROM SESclientes.Usuarios WHERE Email = ?', [email])
      const user = rows[0]

      if(!user || pass!==user.Contraseña){
        res.render('login',{
           alert:true,
           alertTitle: "Advertencia",
           alertMessage: "Ingrese un mail y password",
           alertIcon:'info',
           showConfirmButton: true,
           timer: false,
           ruta: 'login'
        })
      }else{
        //inicio de sesion OK!
        const id = user.idUsuarios
        const token = jwt.sign({id:id},process.env.JWT_SECRETO,{
           expiresIn: process.env.JWT_TIEMPO_EXPIRA
        })
        console.log("TOKEN: "+token+" para el email: "+email)
        const cookiesOption ={
           expiresIn: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES *24*60*60*1000), 
           httpOnly: true
        }
        res.cookie('jwt', token, cookiesOption)
        res.render('login',{
           alert:true,
           alertTitle: "Conexion exitosa",
           alertMessage: "Login Correcto",
           alertIcon:'success',
           showConfirmButton: false,
           timer: 800,
           ruta: 'menu'
        })
      }
    }

  }catch(error){
    console.log (error)
  }
}

exports.isAuthenticated = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO);
      const id = decodificada.id;
      const [rows, fields] = await pool.execute('SELECT * FROM SESclientes.Usuarios WHERE idUsuarios = ?', [id]);
      if (!rows || rows.length === 0) {return next();}
      req.user = rows[0];
      console.log("usuario en autentificacion: ");
      console.dir(req.user);
      return next();
    } catch (error) {
      console.log("Error en isAuthenticated: ", error);
      return next();
    }
  } else {
    res.redirect('/login');
  }
};


exports.logout= (req,res)=>{
  res.clearCookie('jwt')
  return res.redirect('/login')
}
