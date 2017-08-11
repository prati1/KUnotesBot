var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var multer = require('multer');
const Image = require('../models/files');


/*router.get('/:id', function(req, res, next){
    var file = req.params.myimage,
    path = __dirname + '/uploads/' +file;
    res.download("uploads/report.docx");
   
  });*/



router.get('/:id', function(req, res, next){
	Image.findOne({_id: req.params.id},function(err,doc){
		console.log('data...',doc);
		var file = doc.myimage;
		path = 'E:/project/KUnotes/kunotes/uploads/' +file;
		res.download(path);
	});
});




/* var file = req.params.path
    , path = __dirname + '/uploads/' + file;

  res.download(path);*/
/*Image.findOne({_id: req.params.id}, function(err,doc){
	if (err) throw err;
	console.log('download..........');
	var id = req.params.id;
	console.log('path..',path);
  res.download("/"+path);


})*/

/*  var file = req.params.id;
  var path = require('path');
  var path = path.resolve(".") + '/uploads/' + file;


   res.download = function(path,filename,callback){
  	var done = callback;
  	var name = filename;
  	var headers = {
    'Content-Disposition': contentDisposition(name || path)
  };

  // Resolve the full path for sendFile
  var fullPath = path;

  return this.sendFile(fullPath, { headers: headers }, done);
  }
*/


  /*   var file = req.params.id
    , path = __dirname + '/uploads/' + file;

  res.download = function(path,filename,callback){
  	var done = callback;
  	var name = filename;
  	var headers = {
    'Content-Disposition': contentDisposition(name || path)
  };

  // Resolve the full path for sendFile
  var fullPath = resolve(path);

  return this.sendFile(fullPath, { headers: headers }, done);
  }*/
/*});*/

module.exports = router;