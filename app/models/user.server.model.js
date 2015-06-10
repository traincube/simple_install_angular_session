var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;
/*
//simplest Schema example
var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    username: String,
    password: String
});
*/


var UserSchema = new Schema({
    firstName: {
        type:String,
        required:true
    },
    lastName: {
        type: String,
        required:true
    },
    email: {
        type: String,
        trim: true//,
        //match: [/.+\@+\.+/, "a valid email is needed"]
       , index: true
    },
    username: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required:true,
        validate: [
            function(password){
                return password && password.length >6;
            }, 'Password should be greater than six characters'
        ]
    },
    salt:{
        type: String
    },
    provider:{
        type: String,
        required: 'Provider is required'
    },
    providerId: String,
    providerData:{},
    created:{
        type: Date,
        default: Date.now
    },
    website:{
        type: String,
        set: function(url){     //get: function(url) //{if you have existing data in a large DB, change to get and 
                if (url.indexOf('http://') !==0 && url.indexOf('https://') !==0 ) {
                    url = 'http://' + url;
                }       
                return url;
        }
    },
    role:{
        type: String,
        enum: ['Admin', 'Owner', 'User']
    }
});

UserSchema.set('toJSON', {
    getters: true,
    virtuals: true
});  //if you have existing data in a large DB, use getters when converting to JSON

UserSchema.virtual('fullName').get(function() {
   return this.firstName + ' ' + this.lastName;
}).set(function(fullName){
    var splitName = fullName.split(' ');
    this.firstName = splitName[0] || '';
    this.lastName = splitName[1] || '';
});


UserSchema.statics.findOneByUsername = function(username, callback){      //custom static method
    this.findOne({
        username: new RegExp(username, 'i')}, callback);
};

UserSchema.statics.findUniqueUsername = function(username, suffix, callback){
    var _this = this;
    var possibleUsername = username + (suffix || '');
    
    _this.findOne({
        username: possibleUsername}, function(err, user){
            if (!err){
                if(!user){
                callback(possbleUsername);
            }
            else{
                return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
            }
        }else{
            callback(null);
        }
    });
};

UserSchema.methods.authenticate = function(password){      //custom instance method
    return this.password === this.hashPassword(password);
};

UserSchema.methods.hashPassword = function(password){
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
    //password that is passed in, salt that is belongs to the user
};


UserSchema.pre('save', function(next){
   if(this.password){ // we do not want to store password as plain text .. EVER!
    this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
    this.password = this.hashPassword(this.password);
    console.log("time to save");
   }
   next();
});


UserSchema.post('save', function(next){
    if (this.isNew){
        console.log('A new user was created.');
    }else{
        console.log('A user udated its info');
    }
});

UserSchema.set('toJSON', {
    getters: true,
    virtuals: true
});

mongoose.model('User', UserSchema); //user schema and model

