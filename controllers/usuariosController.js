const usuarios = require("../models/usuarios");

exports.list = async (req, res) => {
  try {
    const colUsuarios = await usuarios.find({});
    res.json(colUsuarios);
  } catch (error) {
    console.log(error);
    res.send(error);
    next();
  }
};

exports.inicioSesion = async(req,res)=>{
  try {
    const colUsuarios = await usuarios.find({usu_email:req.params.usu_email,usu_clave:req.params.usu_clave});
    res.json(colUsuarios);
  } catch (error) {
    console.log(error);
    res.send(error);
    next();
  }
}

exports.add = async (req, res) => {
  const usuario = new usuarios(req.body)
  try {
    await usuario.save();
    res.json({
      message:'nuevo usuario adicionado'
    });
  } catch (error) {
    console.log(error);
    res.send(error);
    next();
  }
};

exports.show= async (req, res,next) => {
  try {
    const usuario = await usuarios.find({usu_id:req.params.id});
    if(!usuario){
      res.status(404).json({
        message:'el usuario no existe'
      });
    };
    res.json(usuario);
  } catch (error) {
    res.status(400).json({
      message:'error al procesar la peticion'
    });
  }; 
};

exports.update = async (req, res) => { 
  try {
    const usuario = await usuarios.findOneAndUpdate(
      {usu_id:req.params.id},
      req.body,
      {new:true}
    )
    res.json({
      message:'usuario actualizado'
    });
  } catch (error) {
    res.status(400).json({
      message:'error al procesar la peticion'
    });
  };
};

exports.delete = async (req, res, next) => {
  const id = req.params.id
  try {
    await usuarios.findOneAndDelete({usu_id:id});
    res.json({
      message:'usuario eliminado'
    });
  } catch (error) {
    res.status(400).json({
      message:'error al procesar la peticion'
    });
  }
};



