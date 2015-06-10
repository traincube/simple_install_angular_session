exports.render = function(req, res){
    //res.send('Hello World');//replaced from first version of template
    
    if (req.session.lastVisit) {
      console.log('last visit was ' + req.session.lastVisit);
    }
    
    req.session.lastVisit = new Date();
    
    res.render('index', {
    title: 'Hello World',
    userFullName: req.user ? req.user.fullName : '' //this line passes the authenticated user's full name to the home page template
   });

};

