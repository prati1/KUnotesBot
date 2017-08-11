var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');

const Image = require('../models/files');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*router.get('/images', function(req,res){
	res.render('images');
});*/
/*router.get('/template', function(req,res){
	res.render('template');
});

router.get('/test', function(req,res){
	res.render('test');
});*/


/*router.get('/images', function(req, res) {
 	Image.getImages(function(err, files){
 		console.log('data..........',files[0]);
 		if (err) throw err;
 		res.render('images', {title: 'WLiT Bootcamp 2017', files});
 	})
});*/

router.get('/images', function(req,res){
	Image.find({courseCode: {}},function(err,doc){
		if (err) throw err;
		res.render('images',{files:doc})
	})
})

module.exports = router;

