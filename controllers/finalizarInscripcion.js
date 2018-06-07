import sql from 'msnodesqlv8';
var config =
  "server=DESKTOP-VFJDS7F;Database=proyecto;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
  import moment from 'moment'

  export default (function(req, res, next) {
      var fecha = moment(Date.now()).format('YYYY-MM-DD hh:mm:ss');
      var body = req.body
      var id_usuario = req.session.user.id;
      var id_servicio = req.body.id_servicios
      console.log(id_usuario)
      console.log(body)
      console.log(fecha)
      console.log(id_servicio)
        sql.query(config, `SELECT PrecioServicio AS precio FROM dbo.GymSer WHERE id = '${id_servicio}'`, function(error, resultado) {
          console.log(resultado)
          if (error) {
            console.log(error)
          } else {
            sql.query(config, `INSERT INTO [dbo].[Inscripciones]
              (GymSerID
              ,UsuarioID
              ,FechaIncripcion
              ,PrecioInscripcion)
              VALUES('${id_servicio}', '${id_usuario}', '${fecha}', '${resultado[0].precio}')`, function(error, results) {
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
        }
        })

          
        

      
  })