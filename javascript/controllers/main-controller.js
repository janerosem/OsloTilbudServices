(function() {
    angular.module("osloTilbudApp").controller("MainController", function($scope, registerUserService, productDataService){
        //alert("Ethi ....");
        $scope.model = {
            loginMethod: "LOGIN",
            loginScreen: true,
            userName:"",
            userEmail:"",
            password:"",
            email:"",
            userRoleSelected:"",
            userRolesInSystem: ["Customer","Shop Owner", "Product Owner", "Investor"]
        };

//        $scope.model.productItemsFromServer =  {
//            manufacturer:{
//                name:"manufacturer",
//                displayName:"Manufacturer",
//                data:[
//                    {value:"apple", displayName:"Apple"},
//                    {value:"samsung", displayName:"Samsung"},
//                    {value:"htc", displayName:"HTC"},
//                    {value:"nokia", displayName:"Nokia"},
//                    {value:"zte", displayName:"ZTE"},
//                    {value:"sony", displayName:"Sony"}
//                ]
//            },
//            screensize:{
//                name:"storage",
//                displayName:"Screen Size",
//                data:[
//                    {value:"16", displayName:"16GB"},
//                    {value:"32", displayName:"32GB"}
//                ]
//            },
//            os:{
//                name:"os",
//                displayName:"OS",
//                data:[
//                    {value:"android", displayName:"Android"},
//                    {value:"ios", displayName:"iOS"},
//                    {value:"windows", displayName:"Windows"}
//                ]
//            },
//            camera:{
//                name:"camera",
//                displayName:"Camera",
//                data:[
//                    {value:"5", displayName:"5 Mpx"},
//                    {value:"8", displayName:"8 Mpx"},
//                    {value:"12", displayName:"12 Mpx"},
//                    {value:"15", displayName:"15 Mpx"}
//                ]
//            }
//        };

        $scope.registerUser = function() {
            if(!$scope.model.userName || !$scope.model.password || !$scope.model.userRoleSelected) {
                alert("Please fill all the required fields ...");
            }
            registerUserService.register({
                "username": $scope.model.userName,
                "password": $scope.model.password,
                "role": $scope.model.userRoleSelected
            }).then(function(resp){
                $scope.model.loginScreen = false;
            }, function(error){
                alert("Login failed...!!");
            });
        };
        $scope.loginUser = function() {
            if(!$scope.model.userName || !$scope.model.password || !$scope.model.userRoleSelected) {
                alert("Please fill all the required fields ...");
            }
            registerUserService.register({
                username: $scope.model.userName,
                password: $scope.model.password,
                role: $scope.model.userRoleSelected
            })
        };

        $scope.$watch("model.loginScreen", function(val){
            if(val) {
                $('body').css('background-image', '../images/login.jpg');
            } else {
               document.getElementsByTagName("body")[0].style.backgroundImage = null;
            }
        });

        $( "#fb-root" ).on( "click", function() {
//            $scope.model.loginScreen = false;
            $scope.$apply();

            productDataService.getProductDataFromServer().then(function(data) {
                $scope.model.productItemsFromServer = data;
                $scope.model.loginScreen = false;
            });
        });




        //$scope.showRegisterScreen = function() {}
    });
})();
