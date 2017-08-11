var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var multer = require('multer');
var fs = require('fs');



var mongoose = require('mongoose');
 var conn = mongoose.connection;

mongoose.connect('mongodb://localhost/kunotes_db');
var db = mongoose.collection;
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
var gfs = Grid(conn.db);


/*var upload = multer({dest: './uploads/'})*/
const File = require('../models/files');

var storage = multer.diskStorage({
 destination: function(req, file, cb) {
 cb(null, 'uploads/')
 },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

var upload = multer({
 storage: storage
});
                            


router.post('/',upload.any(), function (req,res){

  var data = req.body;
  var images = req.files[0];
  var newFile = new File();
  newFile.courseCode = data.courseCode;
  newFile.courseName = data.courseName;
  newFile.myimage = images.originalname;
  newFile.year = data.year;
  newFile.semester=data.semester;
  newFile.department=data.department;

    newFile.save(function(err, doc){
    if (err) {console.log('error while saving in database');}
    res.send(req.body);

    var filename = newFile._id + images.originalname;
                    console.log(filename);
    

                 /*   // filename = newProduct._id + productImage.originalname
                    // this make filename unique for each product image
                    var filename = newFile._id + images.originalname;
                    console.log(filename);

                    // save each image in mongodb
                    var writeStream = gfs.createWriteStream({
                        filename: filename,
                        mode: 'w',
                        content_type: images.mimetype
                    });

                    writeStream.on('close', function(file) {
                        return;
                    });

                    writeStream.write(images.buffer);
                    writeStream.end();*/

                  
  });


File.create(images, function(error, image) {
  if (!error) {
    console.log("image created.");
  }
});

            

/*  var newFile = new File(req.body);

  newFile.save(function(err, doc){
    if (err) throw err;
    res.redirect('/');
  });*/
  
})

module.exports = router;







/*var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var multer = require('multer');
const Image = require('../models/files');


router.getImageById = function(id, callback) {
  
 Image.findById(id, callback);
 
}
 
router.addImage = function(image, callback) {
 Image.create(image, callback);
}


var storage = multer.diskStorage({
 destination: function(req, file, cb) {
 cb(null, 'uploads/')
 },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

var upload = multer({
 storage: storage
});


router.post('/', upload.any(), function(req, res) {

 

 
 



var image = req.files[0];
 var path = req.files[0].path;
 var imageName = req.files[0].originalname;
 var coursecode = req.files[0].courseCode;
 
 var imagepath = {};
 imagepath['path'] = path;
 imagepath['originalname'] = imageName;
imagepath['courseCode'] = coursecode;


var data = req.body;
console.log(data);


Image.create(image, function(error, image) {
  if (!error) {
    console.log("image created.");
  }
});
 
var newFile = new Image(req.body);
newFile.courseCode = data.courseCode;
newFile.courseName = data.courseName;

newFile.save(function(error,doc) {
  if (!error){
    res.send(req.body);
  }
 
});




 
});






















module.exports = router;*/