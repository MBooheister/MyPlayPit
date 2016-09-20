var assert = require("assert");
var ReviewProcess = require("../processes/review");
var MembershipApplication = require("../models/membership_application");
var sinon = require("sinon");

describe("The Review Process", function () {
    describe('Recieving a valid application', function () {
       var decision;
        var validApp = new MembershipApplication({
               first : "Test",
                last : "User",
                email : "test@test.com",
                age : 30,
                height : 66,
                weight : 180
            });
            var review = new ReviewProcess();
           
        before(function(done){
             review.on("validated", validationSpy);
             review.on("mission-selected", missionSpy);
             review.on("role-available", roleAvailableSpy);
             review.on("role-compatible", roleCompatibleSpy);
            review.processApplication(validApp,function(err, result){
                decision = result;
                done();
            });
        });
        it('returns success', function (){
            assert(decision.success, decision.message);
        });
        it('ensures the application is valid', function () {
            assert(validationSpy.called); 
        });
        it('selects a mission', function () {
            assert(missionSpy.called); 
        });
        it('ensures a role exists', function () {
            assert(roleAvailableSpy.called); 
        });
        it('ensures role compatibility', function () {
            assert(roleCompatibleSpy.called); 
            
        });
    });
});
