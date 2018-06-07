import sql from 'msnodesqlv8';
var config =
  "server=DESKTOP-VFJDS7F;Database=proyecto;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";

  export default (function(req, res, next) {
      var servicio = req.body.servicio;
      var nombre = req.body.nombre
      var query = `SELECT p.id AS id_tabla
      ,s.id AS id_serv
      ,g.Nombre AS N_gym
      ,s.Nombre AS S_gym
      ,[PrecioServicio] AS precio
        FROM [dbo].[GymSer] AS p
            JOIN dbo.Gimnasio AS g ON p.GimnasioID = g.id
            JOIN dbo.Servicio AS s ON p.ServicioID = s.id
       WHERE s.Nombre = '${servicio}' AND g.Nombre = '${nombre}'`
       sql.query(config, query, function(error, results) {
        if(error) {
            console.log(error)
            var results = {
                error: error
            }
            res.send(results)
        } else {
            console.log(results)
            // console.log("usuario registra servicio")
            res.send(results)
            
            
        }
      })
  })