module.exports = {
    //Development configuration options
    db: 'mongodb://localhost/mean-orange',
    sessionSecret: ' developmentSessionSecret', //use any string you like.... just an example
    facebook: {
        clientID: '1036744756355416',   //application id
        clientSecret: 'c1b1135683e763b16bc99fa985d95110', //application secret
        callbackURL: 'http://localhost:3000/oauth/facebook/callback'
    },
    google:{
        clientID: '369082059441-po8dfe8gm49sme0qr73jg1up05971v6s.apps.googleusercontent.com',
        clientSecret: '4PZvC_LbCeIK-_02feScOgr3',
        callbackURL: 'http://localhost:3000/oauth2callback'
    }
    
};