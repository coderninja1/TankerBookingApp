
angular.module('ionicApp', ['ionic','ngMaterial','ionicApp.controllers'])

.config(function($mdThemingProvider) {

  
  })
  
.run(function($ionicPlatform,$ionicPopup) {
  $ionicPlatform.ready(function() {

      if(window.Connection) {  
                if(navigator.connection.type == Connection.NONE) {
                    $ionicPopup.confirm({
                        title: "Internet Disconnected",
                        content: "The internet is disconnected on your device."
                    })                 
                    .then(function(result) {
                        if(!result) {
                            ionic.Platform.exitApp();
                        }
                    });
                   cordova.plugins.diagnostic.switchToWifiSettings();
                }
            }

          cordova.plugins.diagnostic.isLocationEnabled(function(enabled){
                  
                  if(enabled){
                  }
                  else{
                        $ionicPopup.confirm({
                        title: "GPS",
                        content: "Please Enable Mobile GPS"
                     })
                    .then(function(enabled) {
                        if(!enabled) {
                            ionic.Platform.exitApp();
                        }
                    });
                    cordova.plugins.diagnostic.switchToLocationSettings();
                  }
                    
            });

          
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
   
})
.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {

  $ionicConfigProvider.tabs.position('bottom'); // other values: top

  $stateProvider
    .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html",

    })

    .state('tabs.home', {
      url: "/home",
      views: {
        'home-tab': {
          templateUrl: "templates/home.html",
          
        }
      }
    })

    .state('tabs.verificationpage', {
      url: "/verificationpage",
      views: {
        'register-tab': {
          templateUrl: "templates/verificationpage.html",
          
        }
      }
    })
    
  .state('tabs.menu', {
      url: "/menu",
      cache: false,  
      views: {
        'signin-tab': {
          templateUrl: "templates/menu.html",
        }
      }
    })

    .state('tabs.signin', {
      url: "/signin",
      views: {
        'signin-tab': {
          templateUrl: "templates/signin.html"
        }
      }
    })

    .state('tabs.forgotpassword', {
      url: "/forgotpassword",
      views: {
        'signin-tab': {
          templateUrl: "templates/forgotpassword.html"
        }
      }
    })

  .state('tabs.changepassword', {
      url: "/changepassword",
      views: {
        'signin-tab': {
          templateUrl: "templates/changepassword.html"
        }
      }
    })


    .state('tabs.user_regi', {
      url: "/user_regi",
      views: {
        'register-tab': {
          templateUrl: "templates/user_regi.html"
        }
      }
    })

  .state('tabs.editphone', {
      url: "/editphone",
      views: {
        'register-tab': {
          templateUrl: "templates/editphone.html",
          
        }
      }
    })

     .state('tabs.driver_regi', {
      url: "/driver_regi",
      views: {
        'register-tab': {
          templateUrl: "templates/driver_regi.html"
        }
      }
    })

    .state('tabs.navstack', {
      url: "/navstack",
      views: {
        'about-tab': {
          templateUrl: "templates/nav-stack.html"
        }
      }
    })
   
    .state('tabs.register', {
      url: "/register",
      views: {
        'register-tab': {
          templateUrl: "templates/register.html"
        }
      }
    })


    //==================For User Screens=============

    .state('tabs.driverprofile', {
      url: "/driverprofile",
      cache: false,
      views: {
        'signin-tab': {
          templateUrl: "templates/driverprofile.html"
        }

      }

    })

     .state('tabs.bookinghistory', {
      url: "/bookinghistory",
      cache: false,
      views: {
        'signin-tab': {
          templateUrl: "templates/bookinghistory.html"
        }
      }
    })

    .state('tabs.about', {
      url: "/about",
      cache: false,
      views: {
         'signin-tab' :{
          templateUrl: "templates/about.html"
        }
      }
    })

    //=================Menu for the customer==================

    .state('tabs.menucustomer', {
      url: "/menucustomer", 
      cache: false,  
      views: {
        'signin-tab': {
          templateUrl: "templates/menucustomer.html",
        }
      }
    })

      .state('tabs.customerprofile', {
      url: "/customerprofile",
      cache: false,
      views: {
        'signin-tab': {
          templateUrl: "templates/customerprofile.html"
        }

      }

    })

    .state('tabs.bookinghistorycustomer', {
      url: "/bookinghistorycustomer",
      cache: false,
      views: {
        'signin-tab': {
          templateUrl: "templates/bookinghistorycustomer.html"
        }
      }
    })

     .state('tabs.advancedbooking', {
      url: "/advancedbooking",
      cache: false,
      views: {
        'signin-tab': {
          templateUrl: "templates/advancedbooking.html"
        }
      }
    })



    .state('tabs.maps', {
      url: "/maps",
      cache: false,
      views: {
        'signin-tab': {
          templateUrl: "templates/maps.html"
        }
      }
    })

    .state('tabs.aboutcustomer', {
      url: "/aboutcustomer",
      cache: false,
      views: {
         'signin-tab' :{
          templateUrl: "templates/aboutcustomer.html"
        }
      }
    })
    //=================fareestimates====================

     .state('tabs.fareestimates', {
          url: "/fareestimates",
          cache: false,
          views: {
             'signin-tab' :{
              templateUrl: "templates/fareestimates.html"
            }
          }
        })

    //===================================-==
   $urlRouterProvider.otherwise('/tab/home');

} )


