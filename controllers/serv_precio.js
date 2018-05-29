import sql from 'msnodesqlv8';
var config =
  "server=A1010;Database=proyecto;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
  import session from 'express-session';
export default (function(req, res, next) {
    var gym = req.session.userid;
    var precio = req.body.precio;
    var servicio = req.body.servicio;
    var query = `SELECT p.GimnasioID, g.Nombre AS Nombre_Gimnasio, s.Nombre AS Nombre_Servicio, PrecioServicio FROM [dbo].[GymSer] AS p JOIN dbo.Gimnasio AS g ON p.GimnasioID = g.id JOIN dbo.Servicio AS s on p.ServicioID = s.id WHERE GimnasioID = '${gym}'`

    sql.query(config, query, function(error, results) {
        if(error) {
            console.log(error);
            var results = {
                error: error
            }
            res.send(results)
        } else {
            
            res.send(results)
        }
    })
})




