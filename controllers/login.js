import sql from 'msnodesqlv8';
var config =
  "server=DESKTOP-VFJDS7F;Database=proyecto;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
export default(function(req, res) {
    var email = req.body.email;
  var password = req.body.password;
  var query =
    "SELECT * FROM Usuario WHERE Email ='" +
    email +
    "'  AND Contraseña ='" +
    password +
    "'";

  sql.query(config, query, function(error, results) {
    if (email === results[0].Email &&
      password === results[0].Contraseña) {
        req.session.useremail = req.body.email;
      // req.session.userId = results[0].id;
      // req.session.user = results[0];
      console.log(req.session.useremail)
      console.log("Result Login: ", JSON.stringify(results[0].Email));
      console.log(results[0].Nombre); 
      console.log(results[0].id);
      
      //res.redirect('/')
      var results = {
        error: null
      };
      res.send(results)
    } else {
      var results = {
        error: error
      };

      console.log(results.error);
    }
  });



  var form = {
    nombre: req.body.nombre,
    apellido1: req.body.apellido1,
    apellido2: req.body.apellido2,
    telefono: req.body.telefono,
    DNI: req.body.DNI,
    direccion: req.body.direccion,
    email: req.body.email,
    password: req.body.password,
    provincia: req.body.provincia,
    localidad: req.body.localidad
  };
  var query = `INSERT INTO dbo.Usuario (Nombre, Apellido1, Apellido2, DNI, Direccion, Email, Contraseña, Provincia, Localidad, Telefono)
  VALUES('${form.nombre}', '${form.apellido1}', '${form.apellido2}', '${
    form.DNI
  }', '${form.direccion}', '${form.email}', '${form.password}', '${
    form.provincia
  }', '${form.localidad}', '${form.telefono}')`;

  sql.query(config, query, function(error, results, fields) {
    if (error) {
      console.log(error);
      var dato = Object.assign({}, req.body, {
        error: "Credenciales incorrectas"
      });
      res.redirect("/Signup", dato);
    } else {
      var results = {
        error: null,
        nombre: form.nombre,
        apellido1: form.apellido1,
        apellido2: form.apellido2,
        telefono: form.telefono,
        DNI: form.DNI,
        direccion: form.direccion,
        email: form.email,
        password: form.password,
        provincia: form.provincia,
        localidad: form.localidad
      };
      req.session.useremail = results.email;
      console.log(req.session.useremail);
      req.session.user = results.nombre;
      console.log("Result POST: ", results.email);
      res.send(results);
    }
  });
});
