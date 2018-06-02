import sql from 'msnodesqlv8';
var config =
  "server=DESKTOP-VFJDS7F;Database=proyecto;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
  import moment from 'moment'

  export default (function(req, res, next) {
      var fecha = moment(Date.now()).format('AAAA-MM-DD hh:mm:ss');
      var query = `INSERT INTO [dbo].[Inscripciones]
      ([GymSerID]
      ,[UsuarioID]
      ,[FechaIncripcion]
      ,[PrecioInscripcion])
      VALUES('${id_tabla}', '${id_usuario}', '${fecha}', '${PrecioServicio}')`

      sql.query(config, query, function(error, results) {
        if(error) {
            console.log(error)
            var results = {
                error: error
            }
            res.send(results)
        } else {
            console.log("usuario registra servicio")
            res.send(results)
        }
      })
  })