const marcadores = require("../models/marcadores");

exports.list = async (req, res) => {
  try {
    const colMarcadores = await marcadores.aggregate([{
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
        'mar_id':'$mar_id',
        'mar_fecha_event': '$mar_fecha_event', 
        'mar_fecha_registro': '$mar_fecha_registro', 
        'mar_hora_event': '$mar_hora_event', 
        'mar_hora_registro': '$mar_hora_registro', 
        'mar_equi_1': '$mar_equi_1', 
        'mar_equi_2': '$mar_equi_2', 
        'equi_id_1': '$equipo1.equi_nombre',
        'equi_img_1':'$equipo1.equi_img', 
        'equi_id_2': '$equipo2.equi_nombre',
        'equi_img_2':'$equipo2.equi_img', 
        'mar_dep_id': '$deporte.dep_nombre'
      }
    }]);
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
          'mar_id':'$mar_id',
          'mar_fecha_event': '$mar_fecha_event', 
          'mar_fecha_registro': '$mar_fecha_registro', 
          'mar_hora_event': '$mar_hora_event', 
          'mar_hora_registro': '$mar_hora_registro', 
          'mar_equi_1': '$mar_equi_1', 
          'mar_equi_2': '$mar_equi_2', 
          'equi_id_1': '$equipo1.equi_nombre',
          'equi_img_1':'$equipo1.equi_img', 
          'equi_id_2': '$equipo2.equi_nombre',
          'equi_img_2':'$equipo2.equi_img', 
          'mar_dep_id': '$deporte.dep_nombre'
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

exports.limitDeporte = async (req, res)=>{
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
          '$match': {
              'mar_dep_id': req.params.dep_id*1
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
            'mar_id':'$mar_id',
            'mar_fecha_event': '$mar_fecha_event', 
            'mar_fecha_registro': '$mar_fecha_registro', 
            'mar_hora_event': '$mar_hora_event', 
            'mar_hora_registro': '$mar_hora_registro', 
            'mar_equi_1': '$mar_equi_1', 
            'mar_equi_2': '$mar_equi_2', 
            'equi_id_1': '$equipo1.equi_nombre',
            'equi_img_1':'$equipo1.equi_img', 
            'equi_id_2': '$equipo2.equi_nombre',
            'equi_img_2':'$equipo2.equi_img', 
            'mar_dep_id': '$deporte.dep_nombre'
          }
      }, {
          '$sort': {
              'fecha': req.params.fechaorden*1
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
              'mar_fecha_event': '$mar_fecha_event', 
              'mar_fecha_registro': '$mar_fecha_registro', 
              'mar_hora_event': '$mar_hora_event', 
              'mar_hora_registro': '$mar_hora_registro', 
              'mar_equi_1': '$mar_equi_1', 
              'mar_equi_2': '$mar_equi_2', 
              'equi_id_1': '$equipo1.equi_nombre',
              'equi_img_1':'$equipo1.equi_img', 
              'equi_id_2': '$equipo2.equi_nombre',
              'equi_img_2':'$equipo2.equi_img', 
              'mar_dep_id': '$deporte.dep_nombre', 
              'mar_usu_id': '$usuario.usu_nombre',
              'mar_usu_email': '$usuario.usu_email'
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
    //console.log(colMarcadores)
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
    const marcador = await marcadores.find({mar_id:req.params.id});
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
      {mar_id:req.params.id},
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
    await marcadores.findOneAndDelete({mar_id:id});
    res.json({
      message:'marcador eliminado'
    });
  } catch (error) {
    res.status(400).json({
      message:'error al procesar la peticion'
    });
  }
};