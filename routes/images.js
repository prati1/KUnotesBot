var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var multer = require('multer');

/*router.get('/update/:id', function(req,res){
	Profile.findOne({_id: req.params.id}, function(err, profile){
		res.render('update', {profile});
		if (err) throw err;
	})
});
*/


//URL : http://localhost:3000/images/
// To get all the images/files stored in MongoDB
router.get('/', function(req, res) {
//calling the function from index.js class using routes object..
router.getImages(function(err, genres) {
if (err) {
throw err;
 
}
res.json(genres);
 
});
});

/*router.get('/download/:id', function(req, res) {
 	Image.findOne({_id: req.params.id},(function(err, files){
 		console.log('data..........',files[0]);
 		if (err) throw err;
 		res.render('download', {title: 'WLiT Bootcamp 2017', files});
 	})
});*/
 

 router.get('/download/:id', function(req,res){
	Image.findOne({_id: req.params.id}, function(err, files){
		console.log('download..........',files);
		res.render('download', {files});
		if (err) throw err;
	})
});
// URL : http://localhost:3000/images/(give you collectionID)
// To get the single image/File using id from the MongoDB
router.get('/:id', function(req, res) {
 
//calling the function from index.js class using routes object..
router.getImageById(req.params.id, function(err, genres) {
if (err) {
throw err;
}
//res.download(genres.path);
res.send(genres.path)
});
});

module.exports = router;