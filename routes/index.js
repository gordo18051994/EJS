import express from "express";
// var api = express.Router();
import { Router } from "express";
import sql from "msnodesqlv8";
import controllers from '../controllers/'

var config =
  "server=A1010;Database=proyecto;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
var api = Router();

api.get("/", function(req, res, next) {
  var role = req.session.role
  var user = req.session.user
  res.render("index", {role: role, user: user});
});
api.get("/Sign", function(req, res, next) {
  res.render("Sign");
});
api.get("/gimnasios", function(req, res, next) {
  var role = req.session.role
  var user = req.session.user
  res.render("gimnasios", {role: role, user: user});
})
api.get("/SignUp", function(req, res, next) {
  res.render("Sign");
});
api.post("/Sign", controllers.login);
api.post("/Signup", controllers.registro);
api.get("/SignEmpresa", function(req, res, next) {
  res.render("Sign_empresa")
})
api.post("/reg_empresa", controllers.reg_empresa);
api.post("/SignEmpresa", controllers.login_empresa);
api.get("/panelEmpresa", function(req, res, next) {
  var role = req.session.role
  var user = req.session.user
  res.render("panel_empresa", {role: role, user: user});
})
api.get("/Servicio", controllers.getServicios);
api.post("/Servicio", controllers.precio);
api.get("/Serv_precio", controllers.serv_precio);
api.get("/Servicio/index", controllers.serv_index);
api.post("/borrar_serv", controllers.borrar_serv);
api.post("/upd_serv", controllers.upd_serv);
api.get("/Inscripcion", function(req, res, next) {
  var role = req.session.role
  var user = req.session.user
  if(!user){
    res.render("Sign")
  } else{
  res.render("Inscripcion", {role: role, user: user})
  }
})
api.post("/Inscripcion/servicio", controllers.precio_servicio)
api.post("/Inscripcion", controllers.inscripcion);
api.get("/getGimnasios", controllers.getGimnasios);
api.post("/FinalizarInscripcion", controllers.finalizarInscripcion)
// api.post("/traerGym", controllers.traerGym);
// api.post("/Inscripcion", , function(req, res, next) {
//   res.render("Inscripcion")
// });
api.get("/contacto", function(req, res, next) {
  
  res.render("contacto");
})
api.get("/Logout", function(req, res, next) {
  req.session.destroy(function(err) {});
  res.render("index", {role: null});
});
module.exports = api;
