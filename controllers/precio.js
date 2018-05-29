import sql from 'msnodesqlv8';
var config =
  "server=A1010;Database=proyecto;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
  import session from 'express-session'

  export default(function(req, res, next) {
      var gym = req.session.userid;
      var precio = req.body.precio;
      var servicio = req.body.servicio;
      console.log(gym)
      var  query = `INSERT INTO [dbo].[GymSer](GimnasioID, ServicioID, PrecioServicio) VALUES ('${gym}', ${servicio}, ${precio})`;

      sql.query(config, query, function(error, results) {
          if(error) {
              console.log(error)
              var results = {
                  error: error
              }
            res.send(results)
          } else {
              var results = {
                  error: null,
                  gym: gym,
                  precio: precio,
                  servicio: servicio
              }
            console.log("Result GymSer : ", results)
            res.send(results)
          }
      })
  })