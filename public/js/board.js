var app = angular.module('testMaker',['ngMaterial', 'ngMessages']);

    app.controller('MainCtrl', function ($scope,$http) {


        $scope.boardList = [];
        $scope.boardForm = {};
        $scope.answerForm = {};
        if(window.boardList){
        $scope.boardList = window.boardList;
        }


        if(window.board){
            $scope.board = window.board;
        }

        if(window.answer){
            $scope.answer = window.answer;
        }


        $scope.boardWrite = function(){
            location.href = "/boardWrite"
        };

        $scope.boardDetail = function(boardId){
            location.href = "/boardDetail?boardId="+boardId;
        }

        $scope.boardDetailAdmin = function(boardId){
            location.href = "/admin/boardDetail?boardId="+boardId;
        };


        $scope.insertBoard = function(){

            var form  = $scope.boardForm;



            if(form.title == ""){
                alert("제목을 입력해주세요.");
                return false;
            }

            if(form.content == ""){
                alert("내용을 입력해주세요.");
                return false;
            }


            $http({
                method: 'POST',
                url: '/insertBoard',
                data: form

            }).then(function(res) {
                window.location.href = "/board";



            }, function(err) {
                console.error(err);

            });
        }
        $scope.insertAnswer = function(){

            var form  = $scope.answerForm;

            if(form.content == ""){
                alert("내용을 입력해주세요.");
                return false;
            }

            form.boardId = board[0]._id;
            $http({
                method: 'POST',
                url: '/insertAnswer',
                data: form

            }).then(function(res) {
                $scope.answer.push(form);

            }, function(err) {
                console.error(err);

            });
        }

        $scope.deleteBoard = function(){

            var form  = {};

            form.boardId = board[0]._id;
            $http({
                method: 'delete',
                url: '/board',
                params: form

            }).then(function(res) {
                window.location.href = "/board";

            }, function(err) {
                console.error(err);

            });
        }



    });