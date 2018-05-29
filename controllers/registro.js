import sql from "msnodesqlv8";
var config =
  "server=A1010;Database=proyecto;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
export default (function(req, res, next) {
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
      req.session.user = results.id;
      console.log("Result POST: ", results.email);
      console.log(res);
      res.redirect("/");
    }
  });
});
