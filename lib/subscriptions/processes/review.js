var Emitter = require("events").EventEmitter;
var util = require("util");

var ReviewProcess = function(args){
    var callback;
    
    //make sure the app is valid
    this.ensureAppValid = function(app){
        if(app.isValid()){
           this.emit("validated", app);
           }else{
               this.emit("invalid", app.validationMessage());
           }
        
    };
    // find the next mission
    this.findNextMission = function(app){
        // stub this out (make up a framework to hold what we think may be needed here for later reference)
        app.mission = {
            commandr : null,
            pilot : null,
            NAVPilot : null,
            passengers : []
        };
        this.emit("mission-selected", app);
    };
    //make sure role selected is available
    this.roleIsAvailable = function(app){
            //we have no concept of role selection just yet
            //TODO: What about a role? Need more info
        this.emit("role-available", app);
    };
    //make sure height\weight\age is avaiable
    this.ensureRoleCompatible = function(app){
        // TODO find out about roles and height\weight rage etc...
        this.emit("role-compatible", app);
    };
    // accept the app with a message
    this.acceptApplication = function(app){
        callback(null, {
            success : true,
            message : "Welcome to the Mars Program!"
        });
    };
    //deny the app with a message
    this.denyApplication = function(message){
        callback(null, {
            success : false,
            message : message
        });
      // what do we do here  
    };
    this.processApplication = function(app, next){
        callback = next;
        this.emit("application-recieved", app);
        
    };
    
    //event path
    this.on("application-recieved", this.ensureAppValid);
    this.on("validated", this.findNextMission);
    this.on("mission-selected", this.roleIsAvailable);
    this.on("role-available", this.ensureRoleCompatible);
    this.on("role-compatible", this.acceptApplication);
    
    //sad path
    this.on("invalid", this.denyApplication);
};

util.inherits(ReviewProcess, Emitter);
module.exports = ReviewProcess;


//
//
//

