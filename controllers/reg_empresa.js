import sql from 'msnodesqlv8';
var config =
  "server=DESKTOP-VFJDS7F;Database=proyecto;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
  export default(function(req, res, next) {
    var form_empresa = {
      nombre: req.body.nombre,
      telefono: req.body.telefono,
      direccion: req.body.direccion,
      email: req.body.email,
      password: req.body.password,
      provincia: req.body.provincia,
      localidad: req.body.localidad
    };
    var query = `INSERT INTO dbo.Gimnasio (Nombre, Provincia, Localidad, Direccion, Telefono, Email, Contraseña)
    VALUES('${form_empresa.nombre}', '${form_empresa.provincia}', '${
      form_empresa.localidad
    }', '${form_empresa.direccion}', '${form_empresa.telefono}', '${
      form_empresa.email
    }', '${form_empresa.password}')`;
  
    sql.query(config, query, function(error, results, fields) {
      if (error) {
        console.log(error);
        console.log(form_empresa.telefono);
        var results = {
          error: error
        }
        res.send(results);
      } else {
        var results = {
          error: null,
          nombre: form_empresa.nombre,
          telefono: form_empresa.telefono,
          direccion: form_empresa.direccion,
          email: form_empresa.email,
          password: form_empresa.password,
          provincia: form_empresa.provincia,
          localidad: form_empresa.localidad
        };
        req.session.useremail = results.email;
        console.log(req.session.useremail);
        req.session.user = results.id;
        console.log("Result Gimnasio: ", results);
        res.send(results);
      }
    });
  })
