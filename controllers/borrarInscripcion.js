import sql from 'msnodesqlv8';
var config =
  "server=DESKTOP-VFJDS7F;Database=proyecto;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
  export default (function(req, res, next) {
      var id = req.body.id
      var query = `DELETE FROM [dbo].[Inscripciones]
      WHERE id = '${id}'`
      sql.query(config, query, function(error, results) {
        if (error) {
            console.log(error)
            var results = {
                error: error
            }
            res.send(results)
        } else {
            var results = {
                error: null
            }
            res.send(results)
        }
    })
  })