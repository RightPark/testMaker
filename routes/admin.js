var express = require('express');
var router = express.Router();
handler			= require('./../handler/Handler');



router.get('/', function (req, res) {
    'use strict';


    res.render('admin/login', {});

});

router.get('/main', function (req, res) {
    'use strict';


    res.render('admin/main', {});

});

router.get('/test', function (req, res) {
    'use strict';


    res.render('admin/test', {});

});

router.get('/user', function (req, res) {
    'use strict';

    handler.getUserList(function(err, userList) {
        if (err) {
            if (!err.status) {
                console.error(err);
                console.trace(err);
                winston.error(err);
            }
            return next(err);
        }



        res.render('admin/user', {userList: userList});

    });
});

router.get('/testResult', function (req, res) {
    'use strict';


    res.render('admin/testResult', {userId:req.query.userId});

});


router.get('/getTestResult', function(req, res) {
    'use strict';


    var userId = req.query.userId;
    handler.getTestResult(userId, function(err,result) {
        if (err) {

            if (err.status) {
                res.status(err.status);
                return res.json({error: err.message});
            }
            console.error(err);
            console.trace(err);
            res.status(500);
            return res.json({error: ' fail'});
        }



        res.json({status: true, result: result});
    });
});


router.get('/board', function(req, res) {
    'use strict';

    if(!req.session.userId){
        //      res.redirect("/");
    }

    var userId = req.session.userId;
    handler.getBoardListAdmin(userId, function(err,boardList) {
        if (err) {

            if (err.status) {
                res.status(err.status);
                return res.json({error: err.message});
            }
            console.error(err);
            console.trace(err);
            res.status(500);
            return res.json({error: ' fail'});
        }



        res.render('admin/board', {boardList: boardList});
    });
});



router.get('/boardDetail', function(req, res) {
    'use strict';

    if(!req.session.userId){
        //      res.redirect("/");
    }


    var boardId = req.query.boardId;
    handler.getBoardDetail(boardId, function(err,board, answer) {
        if (err) {

            if (err.status) {
                res.status(err.status);
                return res.json({error: err.message});
            }
            console.error(err);
            console.trace(err);
            res.status(500);
            return res.json({error: ' fail'});
        }



        res.render('admin/boardDetail', {board: board, answer: answer});
    });
});


module.exports = router;
