var url = require('url');
var config = require('../config.json');
var qry = require('../MongodbEngine.js');
var querystring = require("querystring");
var obj = require('../models/SchemaStruct.js');
var objNew = require('../models/productCategory.js');
var os = require('os');

function home(params) {
  var app = params.app;
  app.get('/', OnLoad);
  app.post('/add_Data', InsertData);
  app.get('/DeleteAppRecord/:_id', DeleteAppRecord);
  app.post('/get_product', GetProduct);
}


///*------------------insert record------------*/

function InsertData(req, res) {
  obj.Name = req.body.Name,
    obj.Category = req.body.Category,
    obj.Price = req.body.Price,

    obj.Status = req.body.ddlActive

  qry.insert(obj.schData, obj, function(err, resultApp) {
    if (err) {
      console.log("Error : ", err);
      return;
    }
  });

  objNew.CategoryName = req.body.Category,
    objNew.Food = req.body,
    objNew.Status = req.body.ddlActive
  qry.insertCategory(objNew.productCategory, objNew, function(err, resultApp) {
    if (err) {
      console.log("Error : ", err);
      return;
    }
  });

  res.redirect('/');
}

///*------------------Delete record------------*/
function DeleteAppRecord(req, res) {
  qry.fetchOne(obj.schData, {
    _id: req.params._id
  }, function(err, resultDApp) {
    if (!err) {
      if (resultDApp) {
        resultDApp.remove();
        res.redirect('/');
      }
    }
  });
}



///*------------------On Page Load------------*/
function OnLoad(req, res) {
  qry.fetchAll(obj.schData, {}, function(err, data) {
    if (!err) {
      res.render('Home.html', {
        layout: false,
        'data': data
      });
    }
  });
}


//--------------------------

function GetProduct(req, res) {

  qry.fetchAll(obj.schData, {
    Category: req.body.Category
  }, function(err, data) {
    if (!err) {
      res.render('Home.html', {
        layout: false,
        'data': data
      });
    }
  });
}

module.exports = home;
