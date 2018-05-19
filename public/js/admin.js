var app = angular.module('testMaker',['ngMaterial', 'ngMessages']);

    app.controller('MainCtrl', function ($scope,$http) {



    $scope.test = {title:"",content:"",example:[],correct:[]};


    if(window.userList){
        $scope.userList = window.userList;

    }


    $scope.testResult = function(userId){
        location.href = "/admin/testResult?userId="+userId;

    };
        $scope.doLogin = function(){


            var form  = {};
            form.userId = $scope.userId;
            form.pw = $scope.pw;

            if(form.userId != "admin"){
                alert("관리자만 로그인가능합니다.");
                return false;
            }

            $http({
                method: 'POST',
                url: '/users/login',
                data: form

            }).then(function(res) {
                window.location.href = "/admin/main";



            }, function(err) {
                console.error(err);
                alert("아이디와 비밀번호를 확인해주세요.");
            });
        }

        $scope.createTest = function(){

            var form  = $scope.test;

            console.log(form);

            if(form.title == ""){
                alert("제목을 입력해주세요.");
                return false;
            }


            if(form.example.length <= 0){
                alert("보기를 입력해주세요.");
                return false;
            }

            if(form.correct == ""){
                alert("정답을 입력해주세요.");
                return false;
            }


            $http({
                method: 'POST',
                url: '/test',
                data: form

            }).then(function(res) {
                alert("등록성공.")



            }, function(err) {
                console.error(err);
                alert("등록실패");
            });
        }


    });