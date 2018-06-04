import sql from 'msnodesqlv8';
import localStorage from 'localStorage'
var config =
  "server=A1010;Database=proyecto;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";

  export default (function(req, res, next) {
    var name = req.body.nombre
    console.log(name)
      var query = `SELECT p.id
      ,g.Nombre AS N_gym
      ,s.Nombre AS S_gym
      ,[PrecioServicio] AS precio
        FROM [dbo].[GymSer] AS p
            JOIN dbo.Gimnasio AS g ON p.GimnasioID = g.id
            JOIN dbo.Servicio AS s ON p.ServicioID = s.id
       WHERE g.Nombre = '${name}'`

      sql.query(config, query, function(error, results) {
        if(error) {
            console.log(error)
            var results = {
                error: error
            }
            res.send(results)
            localStorage.setItem("nombre", "diego")
        } else {
            
            // console.log("usuario registra servicio")
            res.send(results)
            
            
        }
      })
  })