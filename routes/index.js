
/*
 * GET home page.
 */

var User = require('../modules/user');
module.exports = function(app){
	app.get('/', function(req, res){
		
  	res.render('index.ejs', { title: 'Express' });
	});	
	app.get('/reg1',function(req,res){
		res.charset = 'UTF-8';
        res.render('reg.ejs', { title: 'Express' });
	});
	app.post('/reg1',function(req,res){
		console.log(req.body);
		if(req.body.passwordrepeat != req.body.password){
			res.render('reg', { error: 'Passsword are not same.',
													title: 'blog'
				 });
			return res.redirect('/reg.ejs');	
		}	;
		var crypto = require('crypto');
		var md5 = crypto.createHash('md5');
		var password = md5.update(req.body.password).digest('base64');
		var newuser = new User({
			name:req.body.username,
			password:password,
		});
		
		User.get(newuser.name,function(err,user){
			if(user){
				err = 'User already exists.';
				return res.render('reg.ejs',{title:'regiser failed.'});	
			}else{
				newuser.save(function(err){
					if(err){
					  //res.send('error',err);
					  return res.render('reg.ejs',{title:'regiser sucess.'});	
					}	else{
						req.session.user = newuser;
						return res.render('index.ejs',{title:'register failed.'});
					}		
				});	
			}
		});
	});
        app.post('/checkusername',function(req,res){
		var username = req.body.username;
                
		User.get(username,function(err,user){
			if(user){
                        	var result = {success:false};//
				res.end(JSON.stringify(result));
			}else{
                        	var result = {success:true};
				res.end(JSON.stringify(result));
			}
               });
	});
}

