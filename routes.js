function isLoggedIn(req,res,next){
	if(req.isAuthenticated())
		return next()
	else{
		res.redirect("/");
	}
}

module.exports = function(app,passport){
	app.get('/',function(req,res){
		if(req.isAuthenticated())
			res.redirect('/home');
		else
			res.render("index");
	})

	/*app.post('/login',function(req,res){
		if(req.body.pass == "redhat"){
			req.session.user = req.body.user;
			res.redirect('/home');
		}
	})*/

	app.get('/register',function(req,res){
		if(req.isAuthenticated())
			res.redirect('/home');
		else 
			res.render("register");
	})

	app.post('/register',passport.authenticate('local-signup',{
		successRedirect :  '/dashfboghard',
		failureRedirect :  '/auth',
 	}))

	app.get('/logout',function(req,res){
		req.logout()
		res.redirect('/');
	})

	app.get('/chatWith',isLoggedIn,function(req,res){
		var chatWith = req.query.user;
		var pageInfo = {};
		pageInfo.friend = chatWith;
		pageInfo.user = req.user
		res.render("privateChat",pageInfo);
	})
	app.get('/home',isLoggedIn,function(req,res){
		let pageInfo = {};
		pageInfo.user = req.user.email;
		res.render("dashboard",pageInfo)
	})
	app.post('/login',passport.authenticate('local-login',{
		successRedirect :  '/home',
		failureRedirect : '/auth',
		failureFlash : true
	}))
	app.get('/auth',function(req,res){
		console.log(req.flash('errorMessages'))
	})
}