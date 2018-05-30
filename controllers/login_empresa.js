import sql from 'msnodesqlv8';
var config =
  "server=A1010;Database=proyecto;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
export default(function(req, res) {
    var email = req.body.email;
  var password = req.body.password;
  console.log(email, password)
  var query =
    "SELECT * FROM Gimnasio WHERE Email ='" +
    email +
    "'  AND Contraseña ='" +
    password +
    "'";

  sql.query(config, query, function(error, results) {
    if (email === results[0].Email &&
      password === results[0].Contraseña) {
        req.session.user = results[0];
        req.session.userid = results[0].id;
        req.session.role = "Empresa";
      // req.session.userId = results[0].id;
      // req.session.user = results[0];
      console.log(req.session.user)
      console.log("Result Login: ", JSON.stringify(results[0].Email));
      console.log(results[0].Nombre); 
      console.log(results[0].id);
      var results = {
        error: null,
        user: req.session.user,
        userid: req.session.userid,
        role: req.session.role     
      };
      
      res.send(results);
    } else {
      var results = {
        error: error
      };
      res.send(results)
    }
  });
});
