angular.module('directory.controllers', [])

    .controller('LoginCtrl', function($scope, $location){
        $scope.user = {
            email : '',
            password : ''
        }

        $scope.doLogin = function(user) {
            console.log(user)
            $location.path('/categories/0');
        };
    })


   .controller('TestCtrl', function($scope, $stateParams, Backend, $location, $ionicModal){

  $ionicModal.fromTemplateUrl('templates/provider-detail.html', function(modal) {

    $scope.modal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  })
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
    return false;
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
    })

   .controller('CategoriesCtrl', function($scope, $stateParams, Backend, $location){
        $scope.map = function(){
            $location.path('/map');
        }
        
        // <button ng-click="map()" class="button button-block button-balanced">Карта</button>

        Backend.getCategoriesById($stateParams.id).then(function(categories){
            $scope.categories = categories;    
            if (categories.length == 0)
                 $location.path('/map');
        })
    })

.controller('MapCtrl', function($scope, $ionicLoading, $ionicModal, $location) {
    
      var init = function() {
        var minsk = new google.maps.LatLng(53.93981,27.59701);
        var mapOptions = {
          center: minsk,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        
        var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);

        var marker = new google.maps.Marker({
              position: minsk,
              map: map,
              title: 'Лена Иванова'
        });

        google.maps.event.addListener(marker, 'click', function() {
// $ionicModal.fromTemplateUrl('templates/provider-detail.html', {
//     scope: $scope,
//     animation: 'slide-in-up'
//   }).then(function(modal) {
//     debugger
//     $scope.modal = modal;
//   });
//   $scope.openModal = function() {
//     $scope.modal.show();
//   };
//   $scope.closeModal = function() {
//     $scope.modal.hide();
//   };
//   //Cleanup the modal when we're done with it!
//   $scope.$on('$destroy', function() {
//     $scope.modal.remove();
//   });
       // debugger
       alert('test')
          // $scope.modal.show();
        });

        // Stop the side bar from dragging when mousedown/tapdown on the map
        google.maps.event.addDomListener(document.getElementById('map'), 'mousedown', function(e) {
       //   alert('sdf')
          e.preventDefault();
          return false;
        });

        $scope.map = map;
      }

// var modal = null;

//       $ionicModal.fromTemplateUrl('templates/provider-detail.html', function(modal, a,b,c) {
        
//     $scope.modal = modal;
//    // modal.scope
//    // $scope.$hasHeader = false;
//   }, {
//  //   scope: $scope,
//     animation: 'slide-in-up'
//   })
//   $scope.openModal = function() {
//     $scope.modal.show();
//   };
 
//   //Cleanup the modal when we're done with it!
//   $scope.$on('$destroy', function() {
//     $scope.modal.remove();
//   });

      //google.maps.event.addDomListener(window, 'load', initialize);
      
      $scope.centerOnMe = function() {
        if(!$scope.map) {
          return;
        }

        $scope.loading = $ionicLoading.show({
          content: 'Getting current location...',
          showBackdrop: false
        });

        navigator.geolocation.getCurrentPosition(function(pos) {
          $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          $scope.loading.hide();
        }, function(error) {
          alert('Unable to get location: ' + error.message);
        });
      };

      $scope.back = function(){
      
        $location.path('/categories/0');
      }
      
 $scope.$on('$viewContentLoaded', function() {
        init()
    });
      //initialize();
    })
.controller('ModalCtrl', function($scope) {
  
  
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  
})

    .controller('EmployeeIndexCtrl', function ($scope, EmployeeService) {

        $scope.searchKey = "";

        $scope.clearSearch = function () {
            $scope.searchKey = "";
            findAllEmployees();
        }

        $scope.search = function () {
            EmployeeService.findByName($scope.searchKey).then(function (employees) {
                $scope.employees = employees;
            });
        }

        var findAllEmployees = function() {
            EmployeeService.findAll().then(function (employees) {
                $scope.employees = employees;
            });
        }

        findAllEmployees();

    })

    .controller('EmployeeDetailCtrl', function ($scope, $stateParams, EmployeeService) {
        EmployeeService.findById($stateParams.employeeId).then(function(employee) {
            $scope.employee = employee;
        });
    })

    .controller('EmployeeReportsCtrl', function ($scope, $stateParams, EmployeeService) {
        EmployeeService.findByManager($stateParams.employeeId).then(function(employees) {
            $scope.employees = employees;
        });
    });
