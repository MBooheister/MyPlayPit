// copied from d/l files
var async = require("async");
var assert = require("assert");
var MissionControl = require("../models/mission_control");
var Assignment = require("../models/assignment");

var ReviewProcess = function(args){
  assert(args.application, "Need an application to review");
  assert(args.db, "Need a database instance");
  assert(args.billing, "Need a subscription processor");

  var db = args.db;
  var billing = args.billing;
  var assignment, mission, app = args.application;
  var missionControl = new MissionControl({
    db : args.db
  });

  //make sure the app is valid
  this.ensureAppValid = function(next){
    if(app.isValid()){
      next(null,true);
    }else{
      next(app.validationMessage(),null);
    }
  };

  //find the next mission
  this.findNextMission = function(next){
    //grab the current mission from mission control
    missionControl.currentMission(function(err,res){
      if(err) {
        next(err,null);
      }else {
        mission = res;
        next(null,res);
      }
    });

  };

  //make sure role selected is available
  this.roleIsAvailable = function(next){
    missionControl.hasSpaceForRole(app.role, next);
  };

  //make sure height/weight/age is right for role
  this.ensureRoleCompatible = function(next){
    assignment = new Assignment({
      passenger : app, 
      role : app.role,
      mission : mission
    });
    //TODO: find out about roles and height/weight etc
    next(null,assignment.passengerIsCompatible);
  };

  this.approveApplication = function(next){
    //send the assignment to disk
    db.saveAssignment({assignment : assignment},next);

  };

  this.startSubscription = function(next){
    //return a subscription
    billing.createSubscription({
      name : app.first + " " + app.last,
      email : app.email,
      plan : app.role,
      card : app.card
    }, next);
  };

  this.processApplication = function(next){
    async.series({
      validated : this.ensureAppValid,
      mission : this.findNextMission,
      roleAvailable: this.roleIsAvailable,
      roleCompatible: this.ensureRoleCompatible,
      subscription: this.startSubscription,
      assignment : this.approveApplication
    }, function(err,result){
      if(err){
        next(null,{
          success : false,
          message : err
        });
      }else{
        result.success = true;
        result.message = "Welcome to Mars!";
        next(null, result);
      }
    });
  };

};

module.exports = ReviewProcess;

//var async = require("async");
//var assert = require("assert");
//var MissionControl = require("../models/mission_control");
//var Assignment = require("../models/assignment");
//
//
//var ReviewProcess = function(args){
//    assert(args.application, "Need an application to review");
//    assert(args.db, "Need adatabase instance");
//    var app = args.application;
//    var missionControl = new MissionControl({
//        db : db
//    });
//    //make sure the app is valid
//    this.ensureAppValid = function(next){
//        if(app.isValid()){
//          next(null,true);
//           }else{
//               next(app.validationMessage(), null);
//           }
//    };
//    // find the next mission
//    this.findNextMission = function(next){
//        // stub this out (make up a framework to hold what we think may be needed here for later reference)
//        var mission = {
//            commander : null,
//            pilot : null,
//            MAVPilot : null,
//            passengers : []
//        };
//        next(null, mission);
//    };
//    //make sure role selected is available
//    this.roleIsAvailable = function(next){
//            //we have no concept of role selection just yet
//            //TODO: What about a role? Need more info
//         next(null, true);
//    };
//    //make sure height\weight\age is avaiable
//    this.ensureRoleCompatible = function(next){
//        // TODO find out about roles and height\weight rage etc...
//         next(null, true);
//    };
//    
//    this.approveApplication = function(next){
//      next(null, true);
//    };
//
//    this.processApplication = function(next){
//        async.series({
//            validated : this.ensureAppValid,
//            mission : this.findNextMission,
//            roleAvailable : this.roleIsAvailable,
//            roleCompatible : this.ensureRoleCompatible,
//            success : this.approveApplication
//        }, function(err, result){
//            if(err) {
//                next(null,{
//                    success : false,
//                    message : err
//                });
//            }else{
//                result.message = "Welcome to Mars!";
//                console.log(result);
//                next(null, result);
//            }
//        });
//    };    
//};
//
//module.exports = ReviewProcess;
