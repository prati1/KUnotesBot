var express = require('express');
var router = express.Router();
var natural = require('natural');
var tokenizer = new natural.WordTokenizer();
var path = require('path');
var bodyParser = require('body-parser');

const Image = require('../models/files');
const Users = require('../models/reguser');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/chatbot', function(req, res, next) {
  res.render('chatbot', { title: 'Express',token: tokenizer.tokenize("title") });
});

/*router.get('/upload', function(req, res, next) {
  res.render('upload', { title: 'Express' });
});*/

/*router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express' });
});
*/
/*router.get('/soe', function(req, res, next) {
  res.render('soe', { title: 'Express' });
});
router.get('/sos', function(req, res, next) {
  res.render('sos', { title: 'Express' });
});*/
/*router.get('/computer', function(req, res, next) {
  res.render('computer', { title: 'Express' });
});*/


router.get('/civil', function(req,res){
	Image.find({department: "Civil Engineering"},function(err,doc){
		if (err) throw err;
		res.render('civil',{files:doc})
	})
})

router.get('/computer', function(req,res){
	Image.find({department: "Computer Engineering"},function(err,doc){
		if (err) throw err;
		res.render('computer',{files:doc})
	})
})

router.get('/complecture', function(req,res){
	Image.find({uploadtype: "L"},function(err,doc){
		if (err) throw err;
		res.render('computer',{files:doc})
	})
})

/*router.get('/soe/compsyllabus', function(req,res){
	Image.find({uploadtype: "S"},function(err,doc){
		if (err) throw err;
		res.render('computer',{files:doc})
	})
})*/
/*router.get('/soe/computer/#lectures', function(req,res){
	Image.find({department: "Computer Engineering"},function(err,doc){
		if (err) throw err;
		res.render('computer',{files:doc})
	})
})*/

router.get('/images', function(req,res){
	Image.find({courseCode: {$exists:true}},function(err,doc){
		if (err) throw err;
		res.render('images',{files:doc})
	})
})


router.get('/tablesave', function(req,res){
	Image.find({courseCode: {$exists:true}},function(err,doc){
		if (err) throw err;
		res.render('tablesave',{files:doc})
	})
})


router.get('/syllabus', function(req,res){
	Image.find({uploadtype: "S"},function(err,doc){
		if (err) throw err;
		res.render('syllabus',{files:doc})
	})
})

router.get('/lectures', function(req,res){
	Image.find({uploadtype: "L"},function(err,doc){
		if (err) throw err;
		res.render('lectures',{files:doc})
	})
})

router.get('/books', function(req,res){
	Image.find({uploadtype: "B"},function(err,doc){
		if (err) throw err;
		res.render('books',{files:doc})
	})
})

router.get('/assignments', function(req,res){
	Image.find({uploadtype: "A"},function(err,doc){
		if (err) throw err;
		res.render('assignments',{files:doc})
	})
})

router.get('/chatbot', function(req,res){
	Image.find({department: "Computer Engineering"},function(err,doc){
		if (err) throw err;
		res.render('computer',{files:doc})
	})
})



/*
function checksessionregister(req,res){
	if(req.session.user){
		res.redirect('/');
		console.log('you are already logged in. Do you want to log in as another user?');
	}
	else{
		res.render('register');
	}

}

function checksessionlogin(req,res){
	if(req.session.user){
		res.redirect('/');
		console.log('you are already logged in. Do you want to log in as another user?');
	}
	else{
		res.render('login');
	}
}*/

function checkSignIn(req, res){
   if(req.session.user){
     /* next(); */
      res.render('upload');    //If session exists, proceed to page
   } else {
      var err = new Error("Not logged in!");
      console.log(req.session.user);
      console.log('you must log in');
      next(err);  //Error, trying to access unauthorized page!
   }
}

router.get('/upload',function(req,res){
	if(req.session.user){
		res.render('upload');
		console.log('user is logged in');
	}
	else{
		console.log('you must be logged in');

		res.redirect('/login');
	}
})

/*var Users = [];*/

/*router.get('/register', checksessionregister,function(req, res){
   res.render('register',{id: req.session.user.username});
});
*/
router.get('/register',function(req,res){
		if(req.session.user){
		res.redirect('/');
		console.log('you are already logged in. Do you want to log in as another user?');
	}
	else{
		res.render('register');
	}
})

router.post('/register', function(req, res){
   if(!req.body.username || !req.body.password){
      res.status("400");
      /*res.send("Invalid details!");*/
      res.render('register',{regerror:'Enter both username and password'});
   } else {
      Users.find({username:{$exists:true}},function(error,user){
      	console.log("helloooo",user[0].username);
      	var i;
      	/*for (i=0;i<5;i++)*/
      	user.forEach(function(users,i){
         if(users.username === req.body.username){
            res.render('login', {
               error: "User Already Exists! Login or choose another user id"});
            console.log("user already exists");
        
         }
        })
      });
      var newUser = {username: req.body.username, password: req.body.password};
      /*Users.push(newUser);*/
      var newusersave = new Users(req.body);

        newusersave.save(function(err, doc){
    if (err) {console.log('error while saving in database');}
    /*console.log(doc);*/
    else{
    console.log('saved in database');
     req.session.user = req.body.username;
      res.render('index',{curuser: req.body.username});
    /*res.send(req.body);*/
  	/*res.render('/sesindex',{curuser: user.id});
*/   }               
 	 });

     /* req.session.user = newUser;*/
    
   }
});


/*router.get('/upload', checkSignIn, function(req, res){
   res.render('upload', {username: req.session.user.username});
});*/



/*router.get('/login',checksessionlogin, function(req, res){
   res.render('login',{id: req.session.user.username});
});
*/
router.get('/login',function(req,res){
	if (req.session.user){
		res.redirect('/');
		console.log('user is already logged in');
	}
	else{
		/*res.redirect('/sesindex')*/
		res.render('login', {help: "You must log in to continue..."});
		console.log('user is not logged in');
	}
})

router.post('/login', function(req, res){
/*   console.log(Users);
   if(!req.body.username || !req.body.password){
      res.render('login', {message: "Please enter both id and password"});
      console.log('Enter both username and password');
   } 

   else {
      Users.find({username: {$exists:true}},function(error,user){
      	console.log(user[0].username);
      	var i;
      	user.forEach(function(users,i){
         if(users.username === req.body.username && users.password === req.body.password){
            req.session.user = req.body.username;            
            res.render('index',{curuser: users.username});
            console.log(req.session.user);
           
         }
	})


      });
   }*/
 Users.findOne({ username: req.body.username }, function(err, user) {
    if (!user) {
      res.render('login', { error: 'Invalid email or password.' });
    } else {
      if (req.body.password === user.password) {
        // sets a cookie with the user's info
        req.session.user = user;
        console.log('username correct');
        res.render('index',{curuser:req.body.username});
      } else {
        res.render('login', { error: 'Invalid email or password.'});
      }
    }
  });

});


router.get('/logout', function(req, res){
   req.session.destroy(function(){
      console.log("user logged out.")
   });
   res.redirect('/');
});

router.use('/upload', function(err, req, res, next){
console.log(err);
   //User should be authenticated! Redirect him to log in.
   res.redirect('/login');
})


module.exports = router;

