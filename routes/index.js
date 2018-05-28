var express = require('express');
var router = express.Router();
var db = require("../sql/db_manage.js");

var multer = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images/uploads')
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname)
    }
});
var upload = multer({storage: storage});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Eman' });
});

router.post('/addPost', upload.single('uImg'),function(req, res, next){
	try{	
		var name = req.body.uName;
		var nick = req.body.uNick;
		var desc = req.body.uMessage;
		var img = req.body.uImg;
		// var file = req.file.uImg;
		// console.log(file.filename);
		var imgin = '/images/uploads/' + Date.now() + '-' + img;

		console.log (name);
		console.log (imgin);

		let sql = `INSERT INTO post (name, nick, description, image) VALUES(?,?,?,?)`;

		db.run(sql, [name, nick, desc, imgin], function(err){
			if (err){
				return console.log("Insert Post Error: " + err.message);
			}
			console.log(name + ` added Successfully with rowid ${this.lastID}`);
			var message = imgin + " created successfully.";
			res.render('index', { title: message});
		});
	}
	catch(ex){
		console.error("Internal error:"+ex);
		return next(ex);
	}
	

});

module.exports = router;
