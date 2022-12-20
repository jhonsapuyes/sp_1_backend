const deportes = require("../models/deportes");

exports.list = async (req, res) => {
  try {
    const colDeportes = await deportes.find({});
    res.json(colDeportes);
  } catch (error) {
    console.log(error);
    res.send(error);
    next();
  }
};

exports.add = async (req, res) => {
  const deporte = new deportes(req.body)
  try {
    await deporte.save();
    res.json({
      message:'nuevo deporte adicionado'
    });
  } catch (error) {
    console.log(error);
    res.send(error);
    next();
  }
};

exports.show= async (req, res,next) => {
  try {
    const deporte = await deportes.find({dep_id:req.params.id});
    if(!deporte){
      res.status(404).json({
        message:'el deporte no existe'
      });
    };
    res.json(deporte);
  } catch (error) {
    res.status(400).json({
      message:'error al procesar la peticion'
    });
  }; 
};

exports.update = async (req, res) => { 
  try {
    const deporte = await deportes.findOneAndUpdate(
      {dep_id:req.params.id},
      req.body,
      {new:true}
    )
    res.json({
      message:'deporte actualizado'
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
    await deportes.findOneAndDelete({dep_id:id});
    res.json({
      message:'deporte eliminado'
    });
  } catch (error) {
    res.status(400).json({
      message:'error al procesar la peticion'
    });
  }
};