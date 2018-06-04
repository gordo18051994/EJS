import sql from 'msnodesqlv8';
var config =
  "server=A1010;Database=proyecto;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
  import session from 'express-session'

  export default (function(req, res, next) {
      var query = `SELECT p.id AS id_tabla, s.id AS id_ser, g.Nombre AS Nombre_Gimnasio, s.Nombre AS Nombre_Servicio, p.PrecioServicio AS Precio_Servicio FROM dbo.GymSer AS p
      JOIN dbo.Gimnasio AS g ON p.GimnasioID = g.id
      JOIN dbo.Servicio AS s ON p.ServicioID = s.id`;
      sql.query(config, query, function(error, results) {
        if (error) {
            var results = {
                error: error
            }
            res.send(results)
        } else {
            req.session.gymserv = results;
            var results = {
                error: null,
                gymserv: req.session.gymserv
            }
            
            res.send(results)
        }
      })
  })