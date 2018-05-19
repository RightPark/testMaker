var app = angular.module('testMaker',['ngMaterial', 'ngMessages']);
    app.controller('MainCtrl', function ($scope,$http) {


        $scope.total = 0;

        $scope.getTestResult = function(){

            $http({
                method: 'GET',
                url: '/getTestResult'

            }).then(function(res) {
                console.log(res.data.result);
                $scope.testResult = res.data.result;

                var testId = [];
               for(var i = 0; i < $scope.testResult.length; i++){
                   testId.push( $scope.testResult[i].testId);
                }
                $scope.getTest(testId);

            }, function(err) {
                console.error(err);

            });
        }


        $scope.getTest = function(testId){

            $http({
                method: 'GET',
                url: '/getTest',
                params: {testId:testId}

            }).then(function(res) {
                console.log(res.data.result);
                $scope.test = res.data.result;
                for (var i = 0; i < $scope.testResult.length; i++) {
                    var uCorrect = "";
                    $scope.testResult[i].correct = JSON.parse($scope.testResult[i].correct);

                    for (var j = 0; j < $scope.testResult[i].correct.length; j++) {
                        if ($scope.testResult[j].testId == $scope.testResult[i].testId) {
                            uCorrect += $scope.testResult[j].correct + ",";
                        }
                    }
                    uCorrect = uCorrect.substring(0, uCorrect.length - 1);

                    $scope.test[i].uCorrect = uCorrect;

                    if($scope.test[i].correct == $scope.test[i].uCorrect){
                            $scope.total += 20;
                        $scope.test[i].result = "정답";
                    }else{
                        $scope.test[i].result = "오답";
                    }
                }



            }, function(err) {
                console.error(err);

            });
        }

        $scope.getTestResult();




    });