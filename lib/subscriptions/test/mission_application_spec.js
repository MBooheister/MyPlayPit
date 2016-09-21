// d/l from online files
var assert = require("assert");
var MembershipApplication = require("../models/membership_application");
var Helpers = require("./helpers");

describe("Membership application requirements", function(){
  var validApp;
  
  before(function(){
    //arrange the data here
    validApp = Helpers.validApplication;
  });

  describe("Application valid if...", function(){
    it("all validators successful", function(){
      assert(validApp.isValid(), "Not valid");
    });
  });
  describe("Application invalid if...", function(){

    it("is expired", function(){
      var app = new MembershipApplication({validUntil : Date.parse("01/01/2010")});
      assert(app.expired())
    });

    it('email is 4 characters or less', function () {
      var app = new MembershipApplication({email : "dd"});
      assert(!app.emailIsValid());
    });
    it('email does not contain an @', function () {
      var app = new MembershipApplication({email : "thingthingthing:thing.com"});
      assert(!app.emailIsValid());
    });
    it('email is omitted', function () {
      var app = new MembershipApplication();
      assert(!app.emailIsValid());
    });
    it('height is less than 60 inches', function () {
      var app = new MembershipApplication({height : 10});
      assert(!app.heightIsValid());
    });
    it('height is more than 75 inches', function () {
      var app = new MembershipApplication({height : 80});
      assert(!app.heightIsValid());
    });
    it('height is omitted', function () {
      var app = new MembershipApplication();
      assert(!app.heightIsValid());
    });
    it('age is more than 100', function () {
      var app = new MembershipApplication({age : 101});
      assert(!app.ageIsValid());
    });
    it('age less than 15', function () {
      var app = new MembershipApplication({age : 14});
      assert(!app.ageIsValid());
    });
    it('age is omitted', function () {
      var app = new MembershipApplication();
      assert(!app.ageIsValid());
    });
    it('weight less than 100', function () {
      var app = new MembershipApplication({weight : 99});
      assert(!app.weightIsValid());
    });
    it('weight less more than 300', function () {
      var app = new MembershipApplication({weight : 301});
      assert(!app.weightIsValid());
    });
    it('weight is omitted', function () {
      var app = new MembershipApplication({weight : 301});
      assert(!app.weightIsValid());
    });
    it('first is omitted', function () {
      var app = new MembershipApplication();
      assert(!app.nameIsValid());
    });
    it('last is omitted', function () {
      var app = new MembershipApplication();
      assert(!app.nameIsValid());
    });
  });
});

//var assert = require("assert");
//var MembershipApplication = require("../models/membership_application");
//var Helpers = require("./helpers");
//
//describe("Membership Application Requirements", function(){
//    var validApp;
//    before(function(){
//        //arrange the data here
//        validApp = Helpers.validApplication;
//    });
//    
//// valid descriptors and inputs
//    // so instead of testing for BOTH Valid and INvalid responses, we are removing the Valid testing section, as the INvalid section does all of this in reverse and in greater detail
//    describe("Application valid IF...", function() {
//        it("all validators are successful", function(){
//            assert(validApp.isValid(), "Not Valid");
//        });
////        it("email is 4 or more characters AND contains an @ symbol", function(){
////            assert(validApp.emailIsValid());
////        });
////        it("height is between 60 and 70 inches", function(){
////            assert(validApp.heightIsValid());
////                  });
////        it("weight is between 100 and 300", function(){
////            assert(validApp.weightIsValid());
////                  });
////        it("age is between 15 and 100", function(){
////            assert(validApp.ageIsValid());
////                  });
////        it("first name and last name are provided", function(){
////            assert(validApp.nameIsValid());
////        });
//    });
//    
//// now adding dates to the testing processes
//
//    // using .skip allows mocha to skip over and not utilize this specific set of instructions until you change the .skip attribute
////    it.skip("is past the validUntil date - ",function(){
////        //hrmmm
////    });
//
//    // using .only will let mocha ignore every thing else you have created and ONLY run this one, specific test
////    it.only("is past the validUntil date - ",function(){
////        //hrmmm
////    });
//    it("is Expired - ",function(){
//        var app = new MembershipApplication({validUntil : Date.parse("01/01/2010")});
//        assert(app.expired());
//    });
//
//// INvalid descriptors and inputs... I expect fails when variables are outside of my predetermined\given ranges
//    describe("Application invalid if...", function(){
//        it('email is 4 characters or less', function() {
//           var app = new MembershipApplication({email : "dd"});
//            assert(!app.emailIsValid());
//        });
//        it('email does not contian an @', function() {
//           var app = new MembershipApplication({email : "thingthingthing:thing.com"});
//            assert(!app.emailIsValid());
//        });
//        it('email is omitted', function() {
//           var app = new MembershipApplication();
//            assert(!app.emailIsValid());
//        });
//        it('height is less than 60 inches', function() {
//           var app = new MembershipApplication({height : 10});
//            assert(!app.heightIsValid());
//        });
//        it('height is greater than 75 inches', function() {
//           var app = new MembershipApplication({height : 10});
//            assert(!app.heightIsValid());
//        });
//        it('height is omitted', function() {
//           var app = new MembershipApplication();
//            assert(!app.heightIsValid());
//        });
//        it('age is more than 100', function() {
//           var app = new MembershipApplication({age : 101});
//            assert(!app.ageIsValid());
//        });
//        it('age is less than 15', function() {
//           var app = new MembershipApplication({height : 10});
//            assert(!app.ageIsValid());
//        });
//        it('age is omitted', function() {
//           var app = new MembershipApplication();
//            assert(!app.ageIsValid());
//        });
//        it('weight is less than 100', function() {
//           var app = new MembershipApplication({weight : 99});
//            assert(!app.weightIsValid());
//        });
//        it('weight is greater than 300', function() {
//           var app = new MembershipApplication({weight : 301});
//            assert(!app.weightIsValid());
//        });
//        it('weight is omitted', function() {
//           var app = new MembershipApplication();
//            assert(!app.weightIsValid());
//        });
//        it('first is omitted', function() {
//           var app = new MembershipApplication();
//            assert(!app.nameIsValid());
//        });
//        it('last is omitted', function() {
//           var app = new MembershipApplication();
//            assert(!app.nameIsValid());
//        });
//    });
//});
//
