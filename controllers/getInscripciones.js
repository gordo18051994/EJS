import sql from 'msnodesqlv8';
var config =
  "server=DESKTOP-VFJDS7F;Database=proyecto;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
  export default (function(req, res, next) {
    var id_usuario = req.session.user.id;
    console.log("Esteid", id_usuario)
    // var query = `SELECT p.id 
    //             FROM dbo.GymSer AS p
    //               JOIN  dbo.Usuario AS u ON p.UsuarioID = u.id
    //               WHERE p.UsuarioID = '${id_usuario}'`
    //     sql.query(config, query, function(error, resultado) {
    //       if(error) {
    //         console.log("err ins", error)
    //       } else {
            var query2 = `SELECT 
              i.id AS id
            ,u.Nombre AS NombreUsuario
            ,g.Nombre AS NombreGimnasio
            ,s.Nombre AS NombreServicio
            ,i.FechaIncripcion AS FechaInscripcion
            ,i.PrecioInscripcion AS PrecioInscripcion 
            FROM dbo.Inscripciones AS i
            JOIN dbo.GymSer AS p ON i.GymSerID = p.id
            JOIN dbo.Servicio AS s ON p.ServicioID = s.id
            JOIN dbo.Usuario AS u ON i.UsuarioID = u.id
            JOIN dbo.Gimnasio AS g ON p.GimnasioID = g.id
            WHERE u.id = '${id_usuario}'`
            sql.query(config, query2, function(error, results) {
              if(error) {
                console.log("aqui", error)
              } else {
                res.send(results)
              }
            // })
          // }
        })
      
     
  })