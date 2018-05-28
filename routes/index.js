import express from "express";
// var api = express.Router();
import { Router } from "express";
import sql from "msnodesqlv8";
import controllers from '../controllers/'

var config =
  "server=A1010;Database=proyecto;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
var api = Router();
api.get("/", function(req, res, next) {
  res.render("index");
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
api.post("/SignEmpresa", controllers.login_empresa);
api.get("/panelEmpresa", function(req, res, next) {
  res.render("panel_empresa");
})
api.get("/Servicio", controllers.getServicios);
api.get("/Logout", function(req, res, next) {
  req.session.destroy(function(err) {});
  res.render("index");
});
module.exports = api;
