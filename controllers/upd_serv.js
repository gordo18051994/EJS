import sql from 'msnodesqlv8';
var config =
  "server=DESKTOP-VFJDS7F;Database=proyecto;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
  export default (function(req, res, next) {
    var id = req.body.id
    var precio = req.body.precio
    console.log(id, precio)

    var query = `UPDATE [dbo].[GymSer] SET PrecioServicio = '${precio}' WHERE id = ${id}`
    sql.query(config, query, function(error, results) {
        if(error) {
            console.log(error)
            var results = {
                error: error
            };
            res.send(results)
        } else  {
            console.log("Update hecho correctamente");
            res.send(results);

        }
    })
  })