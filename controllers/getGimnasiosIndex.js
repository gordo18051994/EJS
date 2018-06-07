
import sql from 'msnodesqlv8'

var config =
  "server=DESKTOP-VFJDS7F;Database=proyecto;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
  
  export default(function(req, res, next) {
    var localidad = req.body.localidad;
    var servicio = req.body.servicio;
    console.log(servicio)
    var query = `SELECT
        p.id AS id_tabla
      ,g.Localidad AS localidad
      ,g.Nombre AS Nombregym
      ,s.Nombre AS Nombreser
      ,s.id AS id_ser
      ,p.PrecioServicio AS PrecioServicio
      ,g.[Provincia] AS prov_gym
      ,g.[Direccion]  AS direc_gym
      ,g.[Telefono] AS tel_gym
      ,g.[Email] AS email_gym
      FROM [dbo].[GymSer] AS p
        JOIN dbo.Gimnasio AS g ON p.GimnasioID = g.id
        JOIN dbo.Servicio AS s ON p.ServicioID = s.id 
      WHERE (g.Localidad = '${localidad}') OR (s.id = '${servicio}')` 
      sql.query(config, query, function(error, results, fields) {
        if (error) {
          console.log("my error", error);
          var results = {
            error: error
          };
          res.send(results);
        } else {

          res.send(results);
        }
      });
});