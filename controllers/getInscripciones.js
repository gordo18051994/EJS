import sql from 'msnodesqlv8';
var config =
  "server=DESKTOP-VFJDS7F;Database=proyecto;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
  export default (function(req, res, next) {
      var id = req.body.user;
      var query = `SELECT 
                    u.Nombre 
                    ,i.FechaIncripcion
                    ,i.PrecioInscripcion FROM dbo.Inscripciones AS i
                    JOIN dbo.Usuario AS u ON i.UsuarioID = u.id`
      
  })