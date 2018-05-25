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
api.post("/Sign", controllers.login);
api.get("/Logout", function(req, res, next) {
  req.session.destroy(function(err) {});
  res.render("index");
});
module.exports = api;
