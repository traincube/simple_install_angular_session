var config = require('./config');  // add this line in... it is our local config directory
var express = require('express');
var morgan = require('morgan');
var compress = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('passport');



module.exports = function(){
    var app = express();
    
    if (process.env.NODE_ENV === 'development'){
        app.use(morgan('dev'));//logging
    }
    else if (process.env.NODE_ENV === 'production') {
        app.use(compress());//compression
    }
    
    
    app.use(bodyParser.urlencoded({
        extended: true //parsing any type
    }));
      
    app.use(bodyParser.json());
    app.use(methodOverride());
    
    app.use(session({       //add this block of code for the session secret
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));
    
    
    app.set('views', './app/views');//view
    app.set('view engine', 'ejs');  // view engine
    
    app.use(flash());
    app.use(passport.initialize()); //middleware that bootstraps the passport module
    app.use(passport.session());    //middleware using the express session to track user's session
    
    require('../app/routes/index.server.routes.js')(app);
    require('../app/routes/users.server.routes.js')(app); //add in route to users for REST API
    
    app.use(express.static('./public'));//serve static files from public directory..
    //remember order matters looking through the files should be last because i/o is costly
    
    return app;
}