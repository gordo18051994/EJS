
import sql from 'msnodesqlv8'

var config =
  "server=DESKTOP-VFJDS7F;Database=proyecto;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
  
  export default(function(req, res, next) {
  sql.query(config, 'SELECT * FROM dbo.Gimnasio', function(error, results, fields) {
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