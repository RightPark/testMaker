var app = angular.module('testMaker',['ngMaterial', 'ngMessages']);
    app.controller('MainCtrl', function ($scope,$http) {




        $scope.todayTest = function(){

            $http({
                method: 'GET',
                url: '/todayTest'

            }).then(function(res) {
                $scope.test = res.data.result;
                for(var i = 0; i < $scope.test.length; i++){
                    $scope.test[i].example = JSON.parse($scope.test[i].example);
                    $scope.test[i].selected = [];
                }

            }, function(err) {
                console.error(err);

            });
        }

        $scope.todayTest();

        $scope.complateTest = function(){
            $http({
                method: 'POST',
                url: '/todayTest',
                data: {test : $scope.test}

            }).then(function(res) {
                location.href="/testResult";

            }, function(err) {
                console.error(err);

            });
        };

        $scope.toggle = function (item, list) {
            var idx = list.indexOf(item);
            if (idx > -1) {
                list.splice(idx, 1);
            }
            else {
                list.push(item);
            }
        };

        $scope.exists = function (item, list) {
            return list.indexOf(item) > -1;
        };


    });