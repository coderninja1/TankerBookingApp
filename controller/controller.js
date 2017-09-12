
//-------------------------- Controller to Signup for User------------------
angular.module('ionicApp.controllers', ['UserValidation'])

// To Disable Back in Entire App


.controller('usercontroller', function($scope,$http,$ionicPopup,$state,$ionicHistory) {
		//Code For sms Integration
  	  var verificationcode = Math.floor(Math.random() * 90000) + 10000;
  	 //  console.log(verificationcode);

	  	  $scope.checkuserdata=function(data){
	  		   
	  		    var username=data.userid;
			    
			  	var phone=data.phone;

			  	var meternumber=data.meternumber;

			  	var email=data.emailid;

			  	var checkuser = "https://www.testurl.in/finaltanker/www/php/checkUserAvail.php?username="+username+"&phone="+phone+"&meter="+meternumber+"&email="+email;     
		      
		        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

			      	$http({
					  method  : 'GET',
					  url : checkuser,
					  processData: false,			
				   	})

			      	.success(function(chekdata){

			      					if(chekdata!==''){
			      						   var alertPopup = $ionicPopup.alert({
				        						title: chekdata,		
				        					});		
			      					}						
						})
	  	  }

	   $scope.verifycode = function(data) {
	    
	  	var email=data.emailid;

        var smslink = "https://www.testurl.in/finaltanker/www/php/smsverification.php?email="+email+"&code="+verificationcode;
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
	      	$http({
			  method  : 'GET',
			  url : smslink,
			  processData: false,			
		   	})

	      	.success(function(datacode){
					console.log(datacode);
			});
	  	}
	    $scope.verifyResponce = function(data) {	
	    var responcecode=data.verificationcode;
	    	if(responcecode===verificationcode){
	    		 $scope.submit(data);
	    	}
	    	else{
		 		var alertPopup = $ionicPopup.alert({
	        					title: 'Code not Matched !',	
	        					template:'Please try again'
	        	});	
		
	    	  }
	  	  }

	  	  $("#resendsms").on("click",function(){

	  	  		var alertPopup = $ionicPopup.alert({
	        					title: 'OTP is sent on Your Mobile',	
	        					template: 'Please Verify Now'
	        	});	
		
	  	  })
	
	  	  
	      $scope.form = [];
	      $scope.files = [];

	      var image_link;

	  $scope.submit = function(data) {
	  	    console.log(data);
	      	$scope.form.image = $scope.files[0];
	      	$http({
			  method  : 'POST',
			  url     : 'https://www.testurl.in/finaltanker/www/php/imageupload.php',
			  processData: false,
			  transformRequest: function (data) {
			      var formData = new FormData();
			      formData.append("image", $scope.form.image);  
			      return formData;  
			  },  
			  data : $scope.form,
			  headers: {
			         'Content-Type': undefined
			  }
		   })

	      	.success(function(imagedata){
		        
		        image_link=imagedata;
		   		  
		        var link = 'https://www.testurl.in/finaltanker/www/php/signup.php?imagelink='+image_link;	
		        //console.log(link);
		        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
		        	
		            $http({
		                method: 'POST',
		                url: link,
		                data: $.param({
		                    fn: data.firstname,
		                    ln: data.lastname,
		                    un: data.userid,
		                    ps:data.password,
		                    em:data.emailid,
		                    ph:data.phone,
		                    ct:data.city,
		                    mn:data.meternumber

		                }),

		                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		            })

			           .success(function (datauser, status, headers, config) {
			            	console.log(datauser);
			        	     if(datauser !==''){
			        			        	var alertPopup = $ionicPopup.alert({
			        						title: 'Registration Succefull!',		
			        					});	

			        	             $state.go('tabs.signin');
			        			  }
			        	        else{
			        	        		var alertPopup = $ionicPopup.alert({
			        						title: 'Registration Failed!',
			        						template: 'Please try again with different username or mobile'
			        					});			 
			        	        	
			        	        }
			              
			            })
		
		      });
	 
 }

	 $scope.uploadedFile = function(element) {
		    $scope.currentFile = element.files[0];
		    var reader = new FileReader();
	
		    reader.onload = function(event) {
		      $scope.image_source = event.target.result
		      $scope.$apply(function($scope) {
		        $scope.files = element.files;
		      });
		    }
                    reader.readAsDataURL(element.files[0]);
		  }
})
//--------------------------password and confirm password validation-----------

angular.module('UserValidation', []).directive('validPasswordC', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue, $scope) {
                var noMatch = viewValue != scope.myForm.password.$viewValue
                ctrl.$setValidity('noMatch', !noMatch)
				return (noMatch)?noMatch:!noMatch;
            })
        }
    }
})

//---------------------------User Login Controller--------------------------------//

.controller('signinuser', function($scope,$http,$ionicPopup,$state,$ionicHistory,$ionicLoading) {
		
		$scope.login=function(data){

			var link = 'https://www.testurl.in/finaltanker/www/php/signin.php';	
			$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

				// send login data
			    $http({
			        method: 'POST',
			        url: link,
			        data: $.param({
			            un: data.username,
			            ps: data.password,
	
			        }),
			        
			        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			    }).success(function (data, status, headers, config) {   
			    	
			        data.records.forEach(function(response) { 
			        var responce=response.id;
	                if(responce==0){
			        	 	var alertPopup = $ionicPopup.alert({
								title: 'User Name Not Availbale!',
							})	
					 
				     return false;
				
			        }
			        else{

			        	var userrole=response.userrole; 
				     	var username=response.username;   
				     	var status=response.status;
				     	var id=response.id;
				        sessionStorage.setItem('uid', id);
				     	sessionStorage.setItem('username', username);

				     	if(status==0){
					   	var alertPopup = $ionicPopup.alert({
									title: ' You Are Not Activated user!',
									})	
					   	return 0;
				     	}

				        if(userrole =='user' && status==1){
						        	var alertPopup = $ionicPopup.alert({
									title: 'You are Login Succesfully!',
								})	
				        	$state.go("tabs.menucustomer");       				   
						}	


						if(userrole =='driver' && status==1)
						{
							 var alertPopup = $ionicPopup.alert({
									title: 'You are Login Succesfully!',
										  })
   							     
   							     $state.go("tabs.menu");
						  
						  }	

			        }

			     })

			    }).error(function (data, status, headers, config) {
			        // handle error things
			    });

			    $ionicHistory.nextViewOptions({
				      disableAnimate: true,
				      disableBack: true
				    });    
	}

/*	$scope.originalUser = angular.copy($scope.data);
		$scope.reset = function(){
		    $scope.data = angular.copy($scope.originalUser);
		    $scope.usersignin.$setPristine();
		};
*/
		// $('#logoutdiv').hide();



})
//============================Controller for Driver=======================
.controller('drivercontroller', function($scope,$http,$ionicPopup,$state,$ionicHistory) {

  	   var verificationcode = Math.floor(Math.random() * 90000) + 10000;

  	   console.log(verificationcode);

  	   $scope.checkuserdata=function(data){
	  		   
	  		    var username=data.userid;
			    
			  	var phone=data.phone;
	  	
			  	var checkdriver = "https://www.testurl.in/finaltanker/www/php/checkDriverAvail.php?username="+username+"&phone="+phone;     
		        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

			      	$http({
					  method  : 'GET',
					  url : checkdriver,
					  processData: false,			
				   	})
				   	
			      	.success(function(chekdata){
			      					if(chekdata!==''){
			      						   var alertPopup = $ionicPopup.alert({
				        						title: chekdata,		
				        					});		
			      					}						
						})
	  	  }

	  $scope.verifycode = function(data) {	
	
	  	var email=data.emailid;

        var smslink = "https://www.testurl.in/finaltanker/www/php/smsverification.php?email="+email+"&code="+verificationcode;

	      	$http({
			  method  : 'GET',
			  url : smslink,
			  processData: false,			
		   	})

	      	.success(function(datacode){
				
			});
	  
	  	}

  		  $("#resendsms").on("click",function(){
  		  		var alertPopup = $ionicPopup.alert({
  	      					title: 'OTP is sent on Your Mobile',	
  	      					template: 'Please Verify Now'
  	      	});	
  	
  		  })





	  $scope.verifyResponce = function(data,imageone) {	
	  	console.log(imageone);
	    var responcecode=data.verificationcode;
	    	if(responcecode===verificationcode){

	    		 $scope.submit(data);
	    	}
	    	else{
	    		
	    	}

	  	  }
 		  
 		  $scope.form = [];
	      $scope.files = [];

	      var image_link;

	  $scope.submit = function(data) {  	
	  
	      	$scope.form.image = $scope.files[0];

	      	var driverimage=$scope.imageone;
	      	var vehicleimage=$scope.imagetwo;
	  
		        var link = 'https://www.testurl.in/finaltanker/www/php/signupdriver.php?driverimage='+driverimage+'&vehicleimage='+vehicleimage;	
		
		         $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
		       
		            $http({
		                method: 'POST',
		                url: link,
		                data: $.param({
		                    fn: data.firstname,
		                    ln: data.lastname,
		                    un: data.userid,
		                    ps:data.password,
		                    em:data.emailid,
		                    ph:data.phone,
		                    ct:data.city,
		                    nwc:data.nwcstationnumber,
		                    nwr:data.nwcregistrationnumber,
		                    ts:data.tankersize

		                }),

		                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		            }).success(function (datauser, status, headers, config) {
		            	
		        	     if(datauser ==="Success"){
		        			        	var alertPopup = $ionicPopup.alert({
		        						title: 'Registration Succefull!',		
		        					});	
		        	            $state.go('tabs.signin');  
		        			  }
		        	        else{
		        	        		var alertPopup = $ionicPopup.alert({
		        						title: 'Registration Failed!',
		        						template: 'Please try again with different username or mobile'
		        					});			 
		        	        	
		        	        }
		              $state.go('tabs.signin');
		            })


		      }
	 
	 $scope.uploadedFile1 = function(element) {
		    $scope.currentFile = element.files[0];
		    var reader = new FileReader();
		   	
		   	 $http({
			  method  : 'POST',
			  url     : 'https://www.testurl.in/finaltanker/www/php/driverimage.php',
			  processData: false,
			  transformRequest: function (data) {
		
			      var formData = new FormData();
			      formData.append("image",  $scope.currentFile);  
			      return formData;  
			  },  
			  data : $scope.form,
			  headers: {
			         'Content-Type': undefined
			  }
		   })

	      	.success(function(imagedata){
	      		driverimagepath=imagedata;
	      	    $("#imageone").val(driverimagepath);
	      		$scope.imageone = driverimagepath;
	      	});

		    reader.onload = function(event) {
		      $scope.image_source = event.target.result
		      $scope.$apply(function($scope) {
		        $scope.files = element.files;
		      });
		    }
                     reader.readAsDataURL(element.files[0]);
                     var buildingimage = document.getElementById('driverprofile');
                     buildingimage.src = URL.createObjectURL(element.files[0]);
                     buildingimage.height = 100;
				     buildingimage.width = 120;
                     return $scope.currentFile;
		  }


		  $scope.uploadedFile2 = function(element) {
		    $scope.currentFile = element.files[0];
		    var reader = new FileReader();
		   	
		   	 $http({
			  method  : 'POST',
			  url     : 'https://www.testurl.in/finaltanker/www/php/vehicleimage.php',
			  processData: false,
			  transformRequest: function (data) {
			
			      var formData = new FormData();
			      formData.append("image",  $scope.currentFile);  
			      return formData;  
			  },  
			  data : $scope.form,
			  headers: {
			         'Content-Type': undefined
			  }
		   })

	      	.success(function(imagedata){
	      		var vehicleimagepath=imagedata;
	      		$("#imagetwo").val(vehicleimagepath);
	      		$scope.imagetwo = vehicleimagepath;
	    	      	});

	

		    reader.onload = function(event) {
		      $scope.image_source = event.target.result
		      $scope.$apply(function($scope) {
		        $scope.files = element.files;
		      });
		    }
                    reader.readAsDataURL(element.files[0]);
                    var vehicleimage = document.getElementById('vehiclephoto');
                    vehicleimage.src = URL.createObjectURL(element.files[0]);
                    vehicleimage.height = 100;
				    vehicleimage.width = 120;
                    return $scope.currentFile;
		  }

})


//=======================End of Driver Controller========================


/*code for Forgot Password*/


.controller('forgotPass', function($scope,$http,$ionicPopup,$state,$log,$ionicHistory){
 
	  var verificationcode = Math.floor(Math.random() * 90000) + 10000;
  	   console.log(verificationcode);

	  $scope.forgotPassword = function(data) {	
	
	  	var phone=data.registermobile;

	  	sessionStorage.setItem('phonnumber', phone);

       //var smslink='https://2factor.in/API/V1/e0a953fb-a4d3-11e6-a40f-00163ef91450/SMS/'+phone+'/'+verificationcode;
        var smslink = "https://www.testurl.in/finaltanker/www/php/forgotpassemailotp.php?phone="+phone+"&code="+verificationcode;
       //	console.log(smslink);
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

	      	$http({
			  method  : 'GET',
			  url : smslink,
			  processData: false,			
		   	})

	      	.success(function(datacode){

	      		if(datacode=='failed'){
	      		  //code to redirect
	      		   $state.go("tabs.register");

	      		}
	      		else{		
	      			 console.log(datacode);	
	      		}
				
			});
	  
	  	}

	  $scope.verify = function(data) {	

		       var responcecode=data.verification;
		       // console.log(responcecode);
		    	if(responcecode == verificationcode){
		    		var alertPopup = $ionicPopup.alert({
		        						title: 'Verify Succefully!',		
		        					});	

		    		 $state.go("tabs.changepassword");
		    	}
		    	else{

    				 var alertPopup = $ionicPopup.confirm({
        						title: 'Enter Authentication code is incorect',
        						template: '',	
        						buttons: [
							     { 
							       text: "Retry",
							       onTap:function(e){
							            return false;
							       }
							     },
							     { 
							      text: "Resend",
							       onTap:function(e){
							       	   $scope.forgotPassword(data);
							            return true;
							       }
							     },
							   ]	
        					});	
    				 alertPopup.then(function(res) {

					      if (res) {

					      	var alertPopup = $ionicPopup.alert({
		        						title: 'Message',
		        						template: 'Authentication code Send Succefully on your Mobile Number',	

		        					});	
					         //console.log('Your input is ', res);

					      } else {

					         //console.log('Please enter input');

					      }

					   })
						
		    	 }

		  	  }

})

//-----------------------Change password------
.controller('changepassword', function($scope,$http,$ionicPopup,$state,$ionicHistory){

		   $scope.changepassword = function(data) {	
		   		var password=data.password;
		   		var phonnumber = sessionStorage.getItem('phonnumber');
		   		var link = "https://www.testurl.in/finaltanker/www/php/changepassword.php?phone="+phonnumber+"&password="+password;
		        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
			      	$http({
					  method  : 'GET',
					  url : link,
					  processData: false,			
				   	})

			      	.success(function(datacode){
						 console.log(datacode);
						 responcedata=datacode;
						  if(responcedata==1){
		        			        	var alertPopup = $ionicPopup.alert({
		        						title: 'Password Update Succefully!',		
		        					});	

		        			  $state.go("tabs.signin");

		        			  }
		        	        else{
		        	        		var alertPopup = $ionicPopup.alert({
		        						title: 'failed!',
		        						template: 'Password Not Succefully'
		        					});			 
		        	        	
		        	        }

					});
				   		
		   }
})


.controller('updatedriver', function($scope,$http,$ionicPopup,$state,$ionicHistory) {

      var username = sessionStorage.getItem('username');

      if(username!==null){

      var link = "https://www.testurl.in/finaltanker/www/php/updatedriver.php?username="+username;
	    
	    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
	      
	      	$http({
			  method  : 'GET',
			  url : link,
			  processData: false,			
		   	})
		 	.success(function(datacode){
		 		// console.log(datacode);
		 		datacode.records.forEach(function(resp) {
				   var id =resp.id;		 
				   var username =resp.username;	   
				   var username =resp.username;
				   var userrole =resp.userrole;
				   var password =resp.password;
				   var status =resp.status;
				   var created_at =resp.created_at;
				   var phone =resp.phone;
				   var email =resp.email;
				   var firstname=resp.firstname;
				   var lastname=resp.lastname;
				   var city=resp.city;
				   var nwcnumber=resp.nwcnumber;
				   var nwcregister=resp.nwcregister;
				   var profileimage=resp.profile_image;
				   var vehicleimage=resp.vehicle_image;
				   var tankersize=resp.tankersize;		   
				   sessionStorage.setItem('user_id', id);		
				   $('#username').val(username);
				   $('#userid').val(id);
				   $('#password').val(password);
				   $('#password_c').val(password);	
				   $('#email').val(email);
				   $('#phone').val(phone);
				   $('#firstname').val(firstname);
				   $('#lastname').val(lastname);
				   $('#city').val(city);
				   $('#nwcregistrationnumber').val(nwcregister);	
				   $('#nwcstationnumber').val(nwcnumber);
				   
				   $('#tanksize').val(tankersize);					
				   if(profileimage!==''){
				   	 //$('#profileimage').attr('src','php/'+profileimage);
				   	 //
				   	 $imgPath = "https://www.testurl.in/finaltanker/www/php/"+profileimage;
				   	 $('#profileimage').attr('src',$imgPath);

				   }

				   if(vehicleimage !==''){
				   	   $imgPath1 = "https://www.testurl.in/finaltanker/www/php/"+vehicleimage;
				   	   $('#vehicleimage').attr('src',$imgPath1);
				   	   // $('#vehicleimage').attr('src','php/'+vehicleimage);

				   }

				})
		 		
		 	});

		  }				  
		  else{
		  	$state.go('tabs.signin');
		  }

	   $scope.update = function(updatedata) {  

	     var userid = sessionStorage.getItem('user_id');

	     var firstname=document.getElementById('firstname').value;

	     var lastname=document.getElementById('lastname').value;

	     var username=document.getElementById('username').value;

	     var password=document.getElementById('password').value;

	     var email=document.getElementById('email').value;

	     var phone=document.getElementById('phone').value;

	     var city=document.getElementById('city').value;

	     var nwcstationnumber=document.getElementById('nwcstationnumber').value;
	     
	     var nwcregistrationnumber=document.getElementById('nwcregistrationnumber').value;

	     var profileimage=document.getElementById('imageone').value;

	     var vehicleimage=document.getElementById('imagetwo').value;

	   	 var link ="https://www.testurl.in/finaltanker/www/php/updatedriverdetails.php?userid="+userid;	

		 $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
				       
				            $http({
				                method: 'POST',
				                url: link,
				                data: $.param({
				                    fn:firstname,
				                    ln:lastname,
				                    un:username,
				                    ps:password,
				                    em:email,
				                    ph:phone,
				                    ct:city,
				                    nwc:nwcstationnumber,
				                    nwr:nwcregistrationnumber,
				                    pi:profileimage,
				                    vi:vehicleimage

				                }),
				                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				            }).success(function (datauser, status, headers, config) {

				            		if(datauser==1){
				            		    var alertPopup = $ionicPopup.alert({
		        						title: 'Profile Updated Succefully!',		
		        					});	

				            		}
				            		else{
				            			var alertPopup = $ionicPopup.alert({
		        			    		title: 'Profile Not Update!',	
		        			    		});	

					          		}

				            })

				      }

	 $scope.uploadedFile1 = function(element) {
		    $scope.currentFile = element.files[0];
		    var reader = new FileReader();  	
		   	 $http({
			  method  : 'POST',
			  url     : 'https://www.testurl.in/finaltanker/www/php/driverimage.php',
			  processData: false,
			  transformRequest: function (data) {
		
			      var formData = new FormData();
			      formData.append("image",  $scope.currentFile);  
			      return formData;  
			  },  
			  data : $scope.form,
			  headers: {
			         'Content-Type': undefined
			  }
		   })

	      	.success(function(imagedata){
	      		driverimagepath=imagedata;
	      	    $("#imageone").val(driverimagepath);
	      		$scope.imageone = driverimagepath;
	      	});

		    reader.onload = function(event) {
		      $scope.image_source = event.target.result
		      $scope.$apply(function($scope) {
		        $scope.files = element.files;
		      });
		    }
                    reader.readAsDataURL(element.files[0]);
                    var changedriverimage = document.getElementById('changedriverimage');
                    changedriverimage.src = URL.createObjectURL(element.files[0]);
                    changedriverimage.height = 100;
				    changedriverimage.width = 120;
                    return $scope.currentFile;
		  }

		  $scope.uploadedFile2 = function(element) {
		    $scope.currentFile = element.files[0];
		    var reader = new FileReader();
		   	
		   	 $http({
			  method  : 'POST',
			  url     : 'https://www.testurl.in/finaltanker/www/php/vehicleimage.php',
			  processData: false,
			  transformRequest: function (data) {
			      //console.log(data);
			      var formData = new FormData();
			      formData.append("image",  $scope.currentFile);  
			      return formData;  
			  },  
			  data : $scope.form,
			  headers: {
			         'Content-Type': undefined
			  }
		   })

	      	.success(function(imagedata){
	      		var vehicleimagepath=imagedata;
	      		$("#imagetwo").val(vehicleimagepath);
	      		$scope.imagetwo = vehicleimagepath;
	  
	      	});
		    reader.onload = function(event) {
		      $scope.image_source = event.target.result
		      $scope.$apply(function($scope) {
		        $scope.files = element.files;
		      });
		    }
                    reader.readAsDataURL(element.files[0]);
                    var changevehicleimage = document.getElementById('changevehicleimage');
                    changevehicleimage.src = URL.createObjectURL(element.files[0]);
                    changevehicleimage.height = 100;
				    changevehicleimage.width = 120;
                    return $scope.currentFile;
		  }

})

.controller('updatecustomer', function($scope,$http,$ionicPopup,$state,$ionicHistory) {
     
      var username = sessionStorage.getItem('username');   
    
      if(username!==null){

      var link = "https://www.testurl.in/finaltanker/www/php/updatecustomer.php?username="+username;	    
	    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';	      
	      	$http({
			  method  : 'GET',
			  url : link,
			  processData: false,			
		   	})

		 	.success(function(datacustomer){	
		 	       // console.log(datacustomer);
				   datacustomer.records.forEach(function(responce) {
				   var id =responce.id;		 
				   var username =responce.username;	   
				   var userrole =responce.userrole;
				   var password =responce.password;
				   var status =responce.status;
				   var created_at =responce.created_at;
				   var phone =responce.phone;
				   var email =responce.email;
				   var firstname=responce.firstname;
				   var lastname=responce.lastname;
				   var city=responce.city;
				   var building_image=responce.building_image;
				   var meternumber=responce.meternumber;
				   sessionStorage.setItem('user_id', id);
				   $('#firstname').val(firstname);
				   $('#lastname').val(lastname);
				   $('#username').val(username);
				   $('#password').val(password);
				   $('#userid').val(id);
				   $('#password_c').val(password);	
				   $('#email').val(email);
				   $('#phone').val(phone);
				   $('#city').val(city);
				   $('#meternumber').val(meternumber);
				   if(building_image !==''){
				   	 $imgPath = "https://www.testurl.in/finaltanker/www/php/"+building_image;
				   	 $('#buildingimage').attr('src',$imgPath);				  
				   }
		
				})
		 		
		 	})
		  }
		  
		  else{
		  	$state.go('tabs.signin');
		  }

	   $scope.update = function(updatedata) {
	      
	     var userid = sessionStorage.getItem('user_id');

	     var firstname=document.getElementById('firstname').value;

	     var lastname=document.getElementById('lastname').value;

	     var username=document.getElementById('username').value;

	     var password=document.getElementById('password').value;

	     var email=document.getElementById('email').value;

	     var phone=document.getElementById('phone').value;

	     var city=document.getElementById('city').value;

	     var meternumber=document.getElementById('meternumber').value;

	     var building_image=document.getElementById('imageone').value;

	   	 var link ="https://www.testurl.in/finaltanker/www/php/updatecustomerdetails.php?userid="+userid;	

		 $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
				       
				            $http({
				                method: 'POST',
				                url: link,
				                data: $.param({
				                    fn:firstname,
				                    ln:lastname,
				                    un:username,
				                    ps:password,
				                    em:email,
				                    ph:phone,
				                    ct:city,
				                    mn:meternumber,
				                    bi:building_image

				                }),
				                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				            }).success(function (datauser, status, headers, config) {
				            		
				            		if(datauser==1){
				            		    var alertPopup = $ionicPopup.alert({
		        						title: 'Profile Updated Succefully!',		
		        					});	

				            		}
				            		else{
				            			var alertPopup = $ionicPopup.alert({
		        			    		title: 'Profile Not Update!',	
		        			    		});	

				            		}

				            })

				      }
		   $scope.uploadedFile = function(element) {
      	    $scope.currentFile = element.files[0];
		    var reader = new FileReader();	   	
		   	 $http({
			  method  : 'POST',
			  url     : 'https://www.testurl.in/finaltanker/www/php/imageupload.php',
			  processData: false,
			  transformRequest: function (data) {
			      //console.log(data);
			      var formData = new FormData();
			      formData.append("image",  $scope.currentFile);  
			      return formData;  
			  },  
			  data : $scope.form,
			  headers: {
			         'Content-Type': undefined
			  }
		   })

	      	.success(function(imagedata){
	      		driverimagepath=imagedata;
	      	    $("#imageone").val(driverimagepath);
	      		$scope.imageone = driverimagepath;

	      	});
	      	
		    reader.onload = function(event) {
		      $scope.image_source = event.target.result
		      $scope.$apply(function($scope) {
		        $scope.files = element.files;
		      });
		    }
                    reader.readAsDataURL(element.files[0]);
                    var buildingimage = document.getElementById('buildingimage');
                    buildingimage.src = URL.createObjectURL(element.files[0]);
                    return $scope.currentFile;
		  }	   	
})

.controller('profilemenu', function($scope,$sce,$http,$ionicPopup,$state,$ionicHistory,$ionicModal) {		
		$scope.logout=function(){
			sessionStorage.clear();  
	        $ionicHistory.clearCache().then(function(){ 	
	    		$state.go('tabs.signin');	   	
	    	})
	}

  $scope.customermap= $sce.trustAsResourceUrl("https://damp-inlet-54571.herokuapp.com/customer");  
 
			  var userid = sessionStorage.getItem('uid');   //get User id

			  var link = "https://www.testurl.in/finaltanker/www/php/selectusermeta.php?id="+userid;
	    
			  $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
			      	
			      	$http({
					  method  : 'GET',
					  url : link,
					  processData: false,			
				   	})

				 	.success(function(datacode){
				 		firstname=datacode.records[0].fname;
						lastname=datacode.records[0].lname;
						city=datacode.records[0].city;
						build_photo=datacode.records[0].build_photo;
						user_role=datacode.records[0].user_role;
						user_name=datacode.records[0].user_name;
						phone=datacode.records[0].phone;
						email=datacode.records[0].email;
						id=datacode.records[0].id;
				 	    $http({
						        url: 'https://damp-inlet-54571.herokuapp.com/datacustomer?firstname='+firstname+'&lastname='+lastname+'&city='+city+'&build_photo='+build_photo+'&phone='+phone+'&id='+id,
						        method: 'POST',
						    }).then(function (httpResponse) {
						        console.log('response:', httpResponse);
						    })
				 
	   	 })

			  var link = "https://www.testurl.in/finaltanker/www/php/tankcharges.php";
	    
			  $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
			      	
			      	$http({
					  method  : 'GET',
					  url : link,
					  processData: false,			
				   	})

				 .success(function(datacode){
				  	var extra_dist=datacode[0].extra_distance;
				  	var long_pipe=datacode[0].long_pipe;
				  	var min_distance=datacode[0].min_distance;
					var per_ton=datacode[0].per_ton;
					var water_pump=datacode[0].water_pump;

 					   $http({
						        url: 'https://damp-inlet-54571.herokuapp.com?extra_dist='+extra_dist+'&long_pipe='+long_pipe+'&min_distance='+min_distance+'&per_ton='+per_ton+'&water_pump='+water_pump,
						        method: 'POST',
						    }).then(function (httpResponse) {
						        console.log('response:', httpResponse);
						    })
					})
		   							            
})

.controller('profilemenudriver', function($scope,$sce,$http,$ionicPopup,$state,$ionicHistory) {	
		
		$scope.logout=function(){
			sessionStorage.clear();  
	        $ionicHistory.clearCache().then(function(){ 	
	    		$state.go('tabs.signin');	  	
	    	})
	}

	    $scope.drivermap= $sce.trustAsResourceUrl("https://damp-inlet-54571.herokuapp.com/driver");

	     var userid = sessionStorage.getItem('uid');   //get User id

			  var link = "https://www.testurl.in/finaltanker/www/php/selectdrivermeta.php?id="+userid;
	    
			  $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
			      	
			      	$http({
					  method  : 'GET',
					  url : link,
					  processData: false,			
				   	})

				 	.success(function(datacode){
				 		
				 		firstname=datacode.records[0].fname;
						lastname=datacode.records[0].lname;
						city=datacode.records[0].city;
						profile_image=datacode.records[0].profile_image;
						vehicle_image=datacode.records[0].vehicle_image;
						nwcregister=datacode.records[0].nwcregister;
						nwcnumber=datacode.records[0].nwcnumber;
						user_role=datacode.records[0].user_role;
						user_name=datacode.records[0].user_name;
						phone=datacode.records[0].phone;
						email=datacode.records[0].email;
						id=datacode.records[0].id;
						tanksize=datacode.records[0].tanksize;
				 	    $http({
						        url: 'https://damp-inlet-54571.herokuapp.com/datadriver?firstname='+firstname+'&lastname='+lastname+'&city='+city+'&profile_image='+profile_image+'&phone='+phone+
						        		'&vehicle_image='+vehicle_image+'&nwcregister='+nwcregister+'&nwcnumber='+nwcnumber+'&id='+id+'&tanksize='+tanksize,
						        method: 'POST',
						    }).then(function (httpResponse) {
						        console.log('response:', httpResponse);
						    })
				 
	   	 })
	
})

.controller('homecontroller', function($scope,$http,$ionicPopup,$state,$ionicHistory) {	
	setTimeout(function() {
    $('#bubble').fadeOut('slow');
    	$state.go('tabs.signin');
	},5000);

})

.controller('homecontroller', function($scope,$http,$ionicPopup,$state,$interval) {
   
		setTimeout(function() {
	    $('#bubble').fadeOut('slow');
	    	$state.go('tabs.signin');
		},5000);

    var self = this, j= 0, counter = 0;

    self.mode = 'query';
    self.activated = true;
    self.determinateValue = 30;
    self.determinateValue2 = 30;

    self.showList = [ ];

    /**
     * Turn off or on the 5 themed loaders
     */
    self.toggleActivation = function() {
        if ( !self.activated ) self.showList = [ ];
        if (  self.activated ) {
          j = counter = 0;
          self.determinateValue = 30;
          self.determinateValue2 = 30;
        }
    };

    $interval(function() {
      self.determinateValue += 1;
      self.determinateValue2 += 1.5;

      if (self.determinateValue > 100) self.determinateValue = 30;
      if (self.determinateValue2 > 100) self.determinateValue2 = 30;

        // Incrementally start animation the five (5) Indeterminate,
        // themed progress circular bars

        if ( (j < 2) && !self.showList[j] && self.activated ) {
          self.showList[j] = true;
        }
        if ( counter++ % 4 === 0 ) j++;

        // Show the indicator in the "Used within Containers" after 200ms delay
        if ( j == 2 ) self.contained = "indeterminate";

    }, 100, 0, true);

    $interval(function() {
      self.mode = (self.mode == 'query' ? 'determinate' : 'query');
    }, 7200, 0, true);
  })


.controller('bookinghistory', function($scope,$http,$ionicPopup,$state,$ionicHistory) {	

	  var userid = sessionStorage.getItem('uid'); 
	  
	  var link = "https://www.testurl.in/finaltanker/www/php/bookingdata.php?userid="+userid;
	    
	    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
	      
	      	$http({
			  method  : 'GET',
			  url : link,
			  processData: false,			
		   	})
		 	.success(function(datacode){
	                $scope.names=datacode;
		 	})

})

.controller('bookinghistorydriver', function($scope,$http,$ionicPopup,$state,$ionicHistory) {	

	  var driver_id = sessionStorage.getItem('uid'); 

	  var link = "https://www.testurl.in/finaltanker/www/php/bookingdetailsdriver.php?driver_id="+driver_id;
	    
	    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
	      
	      	$http({
			  method  : 'GET',
			  url : link,
			  processData: false,			
		   	})
		 	.success(function(datacode){
	                $scope.names=datacode;
		 	})
})

.controller('advancedbooking', function($scope,$http,$ionicPopup,$state,$ionicHistory) {	

	  var userid = sessionStorage.getItem('uid'); 

	  var link = "https://www.testurl.in/finaltanker/www/php/advancedbookingdetails.php?userid="+userid;
	    
	    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
	      
	      	$http({
			  method  : 'GET',
			  url : link,
			  processData: false,			
		   	})
		 	.success(function(datacode){
	                $scope.names=datacode;
	                console.log(datacode);
		 	})
})



