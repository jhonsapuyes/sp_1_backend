const marcadores = require("../models/marcadores");

exports.list = async (req, res) => {
  try {
    const colMarcadores = await marcadores.find({});
    res.json(colMarcadores);
  } catch (error) {
    console.log(error);
    res.send(error);
    next();
  }
};

exports.limit = async (req, res)=>{
  try{
    const marcadoresLimit = await marcadores.aggregate([
      {
        '$lookup': {
          'from': 'equipos', 
          'localField': 'equi_id_1', 
          'foreignField': 'equi_id', 
          'as': 'equipo1'
        }
      }, {
        '$lookup': {
          'from': 'equipos', 
          'localField': 'equi_id_2', 
          'foreignField': 'equi_id', 
          'as': 'equipo2'
        }
      }, {
        '$lookup': {
          'from': 'deportes', 
          'localField': 'mar_dep_id', 
          'foreignField': 'dep_id', 
          'as': 'deporte'
        }
      }, {
        '$unwind': {
          'path': '$equipo1'
        }
      }, {
        '$unwind': {
          'path': '$equipo2'
        }
      }, {
        '$unwind': {
          'path': '$deporte'
        }
      }, {
        '$project': {
          'fecha': '$mar_fecha_event', 
          'horaRegistra': '$mar_fecha_registro', 
          'horaEvento': '$mar_hora_event', 
          'horaRegisEvent': '$mar_hora_registro', 
          'marca1': '$mar_equi_1', 
          'marca2': '$mar_equi_2', 
          'equi1': '$equipo1.equi_nombre', 
          'equi2': '$equipo2.equi_nombre', 
          'deporte': '$deporte.dep_nombre'
        }
      }, {
        '$sort': {
          'fecha': -1
        }
      }, {
        '$limit': req.params.lim*1
      }
    ])
    res.json(marcadoresLimit);
  }catch (error) {
    console.log(error);
    res.send(error);
    next();
  }
}


exports.marcadoresDeUsuario = async (req,res) =>{
  try {
    const colMarcadores = await marcadores.aggregate([
      {
          '$lookup': {
              'from': 'equipos', 
              'localField': 'equi_id_1', 
              'foreignField': 'equi_id', 
              'as': 'equipo1'
          }
      }, {
          '$lookup': {
              'from': 'equipos', 
              'localField': 'equi_id_2', 
              'foreignField': 'equi_id', 
              'as': 'equipo2'
          }
      }, {
          '$lookup': {
              'from': 'deportes', 
              'localField': 'mar_dep_id', 
              'foreignField': 'dep_id', 
              'as': 'deporte'
          }
      }, {
          '$lookup': {
              'from': 'usuarios', 
              'localField': 'mar_usu_id', 
              'foreignField': 'usu_id', 
              'as': 'usuario'
          }
      }, {
          '$unwind': {
              'path': '$equipo1'
          }
      }, {
          '$unwind': {
              'path': '$equipo2'
          }
      }, {
          '$unwind': {
              'path': '$deporte'
          }
      }, {
          '$unwind': {
              'path': '$usuario'
          }
      }, {
          '$project': {
              'fecha': '$mar_fecha_event', 
              'horaRegistra': '$mar_fecha_registro', 
              'horaEvento': '$mar_hora_event', 
              'horaRegisEvent': '$mar_hora_registro', 
              'marca1': '$mar_equi_1', 
              'marca2': '$mar_equi_2', 
              'equi1': '$equipo1.equi_nombre', 
              'equi2': '$equipo2.equi_nombre', 
              'deporte': '$deporte.dep_nombre', 
              'usuario': '$usuario.usu_nombre',
              'correo': '$usuario.usu_email'
          }
      }, {
          '$sort': {
              'fecha': -1
          }
      }, {
          '$match': {
              'usuario': req.params.usuarioName
          }
      }, {
        '$match': {
            'correo': req.params.usuarioCorreo
        }
    }
  ]);
    res.json(colMarcadores);
    console.log(colMarcadores)
  } catch (error) {
    console.log(error);
    res.send(error);
    next();
  }
}

exports.add = async (req, res) => {
  const marcador = new marcadores(req.body)
  try {
    await marcador.save();
    res.json({
      message:'nuevo marcador adicionado'
    });
  } catch (error) {
    console.log(error);
    res.send(error);
    next();
  }
};

exports.show= async (req, res,next) => {
  try {
    const marcador = await marcadores.findById(req.params.id);
    if(!marcador){
      res.status(404).json({
        message:'el marcador no existe'
      });
    };
    res.json(marcador);
  } catch (error) {
    res.status(400).json({
      message:'error al procesar la peticion'
    });
  }; 
};

exports.update = async (req, res) => { 
  try {
    const marcador = await marcadores.findOneAndUpdate(
      {_id:req.params.id},
      req.body,
      {new:true}
    )
    res.json({
      message:'marcador actualizado'
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
    await marcadores.findByIdAndDelete({_id:id});
    res.json({
      message:'marcador eliminado'
    });
  } catch (error) {
    res.status(400).json({
      message:'error al procesar la peticion'
    });
  }
};