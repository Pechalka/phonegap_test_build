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

   .controller('CategoriesCtrl', function($scope, $stateParams, Backend){
        Backend.getCategoriesById($stateParams.id).then(function(categories){
            $scope.categories = categories;    
        })
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
