const equipos = require("../models/equipos");

exports.list = async (req, res) => {
  try {
    const colEquipos = await equipos.aggregate([
      {
          '$lookup': {
              'from': 'deportes', 
              'localField': 'dep_id', 
              'foreignField': 'dep_id', 
              'as': 'dep_id'
          }
      }, {
          '$unwind': {
              'path': '$dep_id'
          }
      }, {
          '$project': {
              'equi_id': '$equi_id', 
              'equi_nombre': '$equi_nombre', 
              'equi_img': '$equi_img', 
              'dep_id': '$dep_id.dep_nombre'
          }
      }
  ]);
    res.json(colEquipos);
  } catch (error) {
    console.log(error);
    res.send(error);
    next();
  }
};

exports.add = async (req, res) => {
  const equipo = new equipos(req.body)
  try {
    await equipo.save();
    res.json({
      message:'nuevo equipo adicionado'
    });
  } catch (error) {
    console.log(error);
    res.send(error);
    next();
  }
};

exports.show= async (req, res,next) => {
  try {
    const equipo = await equipos.find({equi_id:req.params.id});
    if(!equipo){
      res.status(404).json({
        message:'el equipo no existe'
      });
    };
    res.json(equipo);
  } catch (error) {
    res.status(400).json({
      message:'error al procesar la peticion'
    });
  }; 
};

exports.update = async (req, res) => { 
  try {
    const equipo = await equipos.findOneAndUpdate(
      {equi_id:req.params.id},
      req.body,
      {new:true}
    )
    res.json({
      message:'equipo actualizado'
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
    await equipos.findOneAndDelete({equi_id:id});
    res.json({
      message:'equipo eliminado'
    });
  } catch (error) {
    res.status(400).json({
      message:'error al procesar la peticion'
    });
  }
};