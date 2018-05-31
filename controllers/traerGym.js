import sql from 'msnodesqlv8'

var config =
  "server=A1010;Database=proyecto;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";

  export default (function(req, res, next) {
    var query = `SELECT * FROM dbo.Gimnasio WHERE `
  })