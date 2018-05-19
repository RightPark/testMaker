var app = angular.module('testMaker',['ngMaterial', 'ngMessages']);
    app.controller('MainCtrl', function ($scope,$http) {
    $scope.user = {name:"",userId:"",birth:"",pw:""};

        $scope.doLogin = function(){

            var form  = {};
            form.userId = $scope.userId;
            form.pw = $scope.pw;

            $http({
                method: 'POST',
                url: '/users/login',
                data: form

            }).then(function(res) {
                window.location.href = "/";



            }, function(err) {
                console.error(err);
                alert("아이디와 비밀번호를 확인해주세요.");
            });
        }


        $scope.doJoin = function(){

            var form  = $scope.user;



            if(form.name == ""){
                alert("이름을 입력해주세요.");
                return false;
            }

            if(form.userId == ""){
                alert("아이디를 입력해주세요.");
                return false;
            }

            if(form.birth == ""){
                alert("생년월일을 입력해주세요.");
                return false;
            }

            if(form.pw == ""){
                alert("비밀번호를 입력해주세요.");
                return false;
            }else{
                if(form.pw != form.pwChk){
                    alert("비밀번호가 다릅니다.");
                    return false;
                }
            }


            $http({
                method: 'POST',
                url: '/users/join',
                data: form

            }).then(function(res) {
                window.location.href = "/users/login";



            }, function(err) {
                console.error(err);
                alert("이미 존재하는 계정입니다.");
            });
        }


    });