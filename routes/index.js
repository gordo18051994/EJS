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
api.get("/Inscripcion",function(req, res, next) {
  var role = req.session.role
  var user = req.session.user
  res.render("Inscripcion", {role: role, user: user})
});
api.get("/getGimnasios", controllers.getGimnasios);
// api.post("/traerGym", controllers.traerGym);
api.post("/Inscripcion", controllers.inscripcion);
api.get("/Logout", function(req, res, next) {
  req.session.destroy(function(err) {});
  res.render("index", {role: null});
});
module.exports = api;
